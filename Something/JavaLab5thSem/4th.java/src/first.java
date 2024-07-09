import java.util.Scanner;
public class first {

    public static void main(String[] args) {
        Scanner sc =  new Scanner(System.in);
        System.out.println("enter the length:");
        double l = sc.nextDouble();
        System.out.println("enter the breadth:");
        double b = sc.nextDouble();
        System.out.println("area:"+l*b);


        System.out.println("size of the array");
        int n=sc.nextInt();
        System.out.println("enter the elements of first array:");
        int[] arr1= new int[n];
        for(int i=0;i<n;i++){
        arr1[i]=sc.nextInt();
        }

        System.out.println("enter the elements of first array:");
        int[] arr2 = new int[n];
        for(int i=0;i<n;i++){
        arr2[i]=sc.nextInt();
        }
        int[] res = new int[n];
        

        for(int i=0;i<n;i++){
         res[i] = arr1[i]*arr2[i];
        }
        System.out.println("Multiplication of 2 arrays result");
        for(int value:res){
        System.out.println(value);
        }
        System.out.println();



        System.out.println("size of the array");
        int n1=sc.nextInt();
        System.out.println("enter the elements of array:");
        int[] a = new int[n1];
        for(int i=0;i<n1;i++){
        a[i]=sc.nextInt();
        }
        for(int i=0;i<n1;i++)
        {
        for(int j=0;j<n-i-1;j++)
        {
            if(a[j]>a[j+1]){
            int temp = a[j];
            a[j]=a[j+1];
            a[j+1]=temp;
        }
    }
}
        System.out.println("ascending");
        for(int value:a){
        System.out.println(value);
        }
        System.out.println();


        for(int i=0;i<n1;i++)
        {
        for(int j=0;j<n-i-1;j++)
        {
            if(a[j]<a[j+1]){
            int temp = a[j];
            a[j]=a[j+1];
            a[j+1]=temp;
        }
    }
}
        System.out.println("descending");
        for(int value:a){
        System.out.println(value);
        }
        System.out.println();

         }
    
}
