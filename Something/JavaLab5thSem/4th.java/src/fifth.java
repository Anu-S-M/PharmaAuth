import java.util.Scanner;

public class fifth {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the first string: ");
        String str1 = scanner.nextLine();

        System.out.print("Enter the second string: ");
        String str2 = scanner.nextLine();

        // Version 1: Compare entire strings
        compareStrings(str1, str2);

        // Version 2: Compare only specified number of characters
        System.out.print("Enter the number of characters to compare: ");
        int numCharacters = scanner.nextInt();
        compareStrings(str1, str2, numCharacters);

        scanner.close();
    }

    // Version 1: Compare entire strings
    public static void compareStrings(String str1, String str2) {
        if (str1.equals(str2)) {
            System.out.println("Version 1: Strings are equal.");
        } else {
            System.out.println("Version 1: Strings are not equal.");
        }
    }

    // Version 2: Compare only specified number of characters
    public static void compareStrings(String str1, String str2, int numCharacters) {
        if (str1.substring(0, numCharacters).equals(str2.substring(0, numCharacters))) {
            System.out.println("Version 2: The first " + numCharacters + " characters are equal.");
        } else {
            System.out.println("Version 2: The first " + numCharacters + " characters are not equal.");
        }
    }
}
