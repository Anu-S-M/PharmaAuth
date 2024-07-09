const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');  // Add this line
const { mongoose, User } = require('./config/mongoose');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());  // Add this line for connect-flash

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Rest of your code...


// Schedule daily checks for upcoming deadlines and send reminders
schedule.scheduleJob('0 0 * * *', async () => {
  const today = new Date();

  const tasks = await Task.find({
    dueDate: {
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      $gte: today,
    },
    remindersSent: false,
  });

  for (const task of tasks) {
    sendEmailReminder(task);
    await Task.updateOne({ _id: task._id }, { $set: { remindersSent: true } });
  }
});

app.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }

  Task.find({ user: req.user }, (err, tasks) => {
    if (err) {
      console.error('Error loading tasks:', err);
      res.status(500).send('Error loading tasks');
    } else {
      res.render('index', { tasks, user: req.user });
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});


app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true, // This is important for flashing error messages
  })
);


app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.render('register');
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('/');
      });
    }
  );
});

function sendEmailReminder(task) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: task.user,
    subject: 'Task Reminder',
    text: `Reminder: Your task "${task.name}" is due tomorrow on ${task.dueDate.toDateString()}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
