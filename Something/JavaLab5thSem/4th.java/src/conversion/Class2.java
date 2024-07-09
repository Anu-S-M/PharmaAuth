package conversion;

import java.util.Scanner;

public class Class2 implements In1 {
    Scanner anu = new Scanner(System.in);

    public void method() {
        int a;
        System.out.println("Enter the byte value");
        a = anu.nextInt();
        float kilobytes = (float) (a * 0.001);
        System.out.println(a + " bytes = " + kilobytes + " kilobytes");
    }
}
