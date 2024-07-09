import java.util.InputMismatchException;
import java.util.Scanner;

public class eighth{
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {
            // Read the numerator
            System.out.print("Enter the numerator (a positive integer): ");
            int numerator = scanner.nextInt();

            // Read the denominator
            System.out.print("Enter the denominator (a positive integer): ");
            int denominator = scanner.nextInt();

            // Check for negative input or denominator being zero
            if (numerator < 0)  {
                throw new IllegalArgumentException("Negative number input");
            }
            else if( denominator == 0){
                throw new ArithmeticException("divide by zero exception");
            }

            // Perform the division and display the result
            double result = (double) numerator / denominator;
            System.out.println("Result of division: " + result);

        } catch (InputMismatchException e) {
            System.out.println("Invalid input. Please enter positive integers only.");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } 
    }
}
 