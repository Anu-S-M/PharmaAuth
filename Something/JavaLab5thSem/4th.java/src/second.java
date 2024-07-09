import java.util.Scanner;
public class second {
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);

        String[] names = new String[5];
        int[] ids = new int[5];
        String[] depts = new String[5];
        int[] ages = new int[5];
        String[] designations = new String[5];
        int[] salaries = new int[5];

        for(int i=0;i<5;i++)
        {
         System.out.println("name:");
         names[i]=sc.nextLine();

         System.out.println("id:");
         ids[i]=sc.nextInt();
         sc.nextLine();

         System.out.println("dept:");
         depts[i]=sc.nextLine();

         System.out.println("age:");
         ages[i]=sc.nextInt();
         sc.nextLine();

         System.out.println("designations:");
         designations[i]=sc.nextLine();

         System.out.println("salary:");
         salaries[i]=sc.nextInt();
         sc.nextLine();

        }
        for(int i=0;i<5;i++)
        {
            System.out.println(names[i]);
            System.out.println(ids[i]);
            System.out.println(depts[i]);
            System.out.println(ages[i]);
            System.out.println(designations[i]);
            System.out.println(salaries[i]);
        }

        int total= calculate(depts,salaries);
        System.out.println(total);


        int high=find(depts,salaries,designations);
        if (high!= -1) {
            System.out.println("Details of Highest Paid Manager in");
            System.out.println("Name: " + names[high] +
                    ", ID: " + ids[high] +
                    ", Department: " + depts[high] +
                    ", Age: " + ages[high] +
                    ", Designation: " + designations[high] +
                    ", Salary: " + salaries[high]);
        } else {
            System.out.println("No manager found in the ");
    }
}
    public static int calculate(String[] depts,int[] salaries)
    {
    int total=0;
    for(int i=0;i<depts.length;i++)
    {
     if(depts[i].equalsIgnoreCase("sales"))
     {
    total+=salaries[i];
    }
    }
return total;
}
public static int find(String[] depts,int[] salaries,String[] designations)
{
int max=0;
int index=-1;
for(int i=0;i<depts.length;i++)
{
if(depts[i].equalsIgnoreCase("purchase") && designations[i].equalsIgnoreCase("manager") && salaries[i]>max ){
max=salaries[i];
index=i;
}
}
return index;
}
    
}
