import java.util.Scanner;

class Bank {
    String name;
    long accountNumber;
    double balance;

    public void readDetails() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter name: ");
        name = scanner.next(); // Reads a single word, stops at space

        System.out.print("Enter account number: ");
        accountNumber = scanner.nextLong();

        System.out.print("Enter balance: ");
        balance = scanner.nextDouble();
    }

    public void displayDetails() {
        System.out.println("Name: " + name);
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Balance: $" + balance);
    }

    public void calculateInterest() {
        // Implement this method in derived classes
    }
}

class CityBank extends Bank {
    public void calculateInterest() {
        double interestRate = 0.05; // 5% interest rate for City Bank
        double interest = balance * interestRate;
        System.out.println("Interest earned at City Bank: $" + interest);
    }
}

class SBIBank extends Bank {
    public void calculateInterest() {
        double interestRate = 0.06; // 6% interest rate for SBI Bank
        double interest = balance * interestRate;
        System.out.println("Interest earned at SBI Bank: $" + interest);
    }
}

class CanaraBank extends Bank {
    public void calculateInterest() {
        double interestRate = 0.04; // 4% interest rate for Canara Bank
        double interest = balance * interestRate;
        System.out.println("Interest earned at Canara Bank: $" + interest);
    }
}

public class sixth {
    public static void main(String[] args) {
        CityBank cityAccount = new CityBank();
        SBIBank sbiAccount = new SBIBank();
        CanaraBank canaraAccount = new CanaraBank();

        // Reading and displaying details for CityBank account
        System.out.println("Enter details for City Bank account:");
        cityAccount.readDetails();
        cityAccount.displayDetails();
        cityAccount.calculateInterest();

        // Reading and displaying details for SBIBank account
        System.out.println("\nEnter details for SBI Bank account:");
        sbiAccount.readDetails();
        sbiAccount.displayDetails();
        sbiAccount.calculateInterest();

        // Reading and displaying details for CanaraBank account
        System.out.println("\nEnter details for Canara Bank account:");
        canaraAccount.readDetails();
        canaraAccount.displayDetails();
        canaraAccount.calculateInterest();
    }
}



