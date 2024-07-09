function main()
{
    var weight = prompt("enter your weight");
    var height=prompt("enter your height"); 
    bmicalculator(weight,height);
}

// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
function bmicalculator(weight,height)
{
    var bmi = weight/pow(height,2);
    if(bmi<18.5)
    {
        alert("Your BMI is"+bmi+"so you are underweight.");
    }
    else if(bmi>=18.5 && bmi<=24.9)
    {
        alert("Your BMI is"+bmi+", so you have a normal weight.");
    } 
    else{
        alert("your bmi is "+bmi+"so you have overweight");
    }
}