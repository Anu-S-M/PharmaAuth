const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to extract a deadline from the input
function extractDeadline(input) {
  const dateRegex = /(\d{1,2}\/\d{1,2}\/\d{4})/; // Matches dates in the format DD/MM/YYYY
  const matches = input.match(dateRegex);
  return matches ? matches[0] : null;
}

// Function to take user input and extract deadlines
function getUserInput() {
  rl.question('Enter your text paragraph: ', (message) => {
    const deadline = extractDeadline(message);

    if (deadline) {
      console.log(`Deadline found: ${deadline}`);
    } else {
      console.log('No deadline found in the paragraph.');
    }

    rl.question('Do you want to check another paragraph? (yes/no): ', (answer) => {
      if (answer.toLowerCase() === 'yes') {
        getUserInput();
      } else {
        rl.close();
      }
    });
  });
}

// Start the application
getUserInput();
