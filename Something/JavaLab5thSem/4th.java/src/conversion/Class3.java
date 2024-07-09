package conversion;

import java.util.Scanner;

public class Class3 implements In1 {
    Scanner anu = new Scanner(System.in);

    public void method() {
        int euro;
        System.out.println("Enter the euro value");
        euro = anu.nextInt();
        float rupees = euro * 90;
        System.out.println(euro + " euros = " + rupees + " rupees");
    }
}
