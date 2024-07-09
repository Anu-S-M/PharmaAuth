import java.util.Scanner;

class Person {
    String name;
    int age;
    char gender;

    public void readDetails() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter name: ");
        name = scanner.nextLine();
        System.out.print("Enter age: ");
        age = scanner.nextInt();
        System.out.print("Enter gender (M/F): ");
        gender = scanner.next().charAt(0);
    }

    public void displayDetails() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Gender: " + gender);
    }
}

class Employee extends Person {
    int employeeId;

   
    public void readDetails() {
        super.readDetails();
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter employee ID: ");
        employeeId = scanner.nextInt();
    }

   
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Employee ID: " + employeeId);
    }
}

class Student extends Person {
    int studentId;

  
    public void readDetails() {
        super.readDetails();
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter student ID: ");
        studentId = scanner.nextInt();
    }

  
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Student ID: " + studentId);
    }
}

public class fourth{
    public static void main(String[] args) {
        // Display details for five employees
        for (int i = 0; i < 5; i++) {
            System.out.println("\nEmployee " + (i + 1) + " details:");
            Employee employee = new Employee();
            employee.readDetails();
            employee.displayDetails();
        }

        // Display details for five students
        for (int i = 0; i < 5; i++) {
            System.out.println("\nStudent " + (i + 1) + " details:");
            Student student = new Student();
            student.readDetails();
            student.displayDetails();
        }
    }
}

