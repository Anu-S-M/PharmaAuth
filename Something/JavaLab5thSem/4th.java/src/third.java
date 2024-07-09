public class third {
    int real;
    int imag;

    public third(int r,int i)
    {
    this.real=r;
    this.imag=i;
    }
    public void display(){
    System.out.println(real+"+"+imag+"i");
}

    public static third addition(third c1,third c2)
    {
        third res1=new third(0, 0);
        res1.real=c1.real+c2.real;
        res1.imag=c1.imag+c2.imag;
        return res1;

    } 
    public static third subtraction(third c1,third c2)
    {
        third res2=new third(0, 0);
        res2.real=c1.real-c2.real;
        res2.imag=c1.imag-c2.imag;
        return res2;

    } 
    public static boolean compare(third c1,third c2)
    {
        return c1.real==c2.real && c1.imag==c2.imag;
    }
    public static void main(String[] args) {
        third num1=new third(10,12);
        third num2=new third(10,12);
        num1.display();
        num2.display();
        third res1=addition(num1, num2);
        System.out.println(res1.real+"+"+res1.imag+"i");

        third res2=subtraction(num1, num2);
        System.out.println(res2.real+"+"+res2.imag+"i");
        boolean res3=compare(num1, num2);
        if(res3)
        {
        System.out.println("equal");}
        else{
        System.out.println("not equal");
    }

    }
    
}
