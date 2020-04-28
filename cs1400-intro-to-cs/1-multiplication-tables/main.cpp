//Chase Mortensen A01535275
//Write a function that will display a single multiplication table.It is to receive a single integer and produce a table that contains all the multiplication facts for that number multiplying it by each number from 0 to 12. Use the iomanip commands to have the values in the table line up nicely.
//Write a main function that asks the user what multiplication tables they would like printed.Get two numbers from the user.Verify that the second number is greater than or equal to the first number.If it is not, have the user continue to enter the second number until it is larger than or equal to the first.Have the program print all the multiplication tables from the first number to the last number.To print these tables, main is to call the function described above the correct number of times and with the correct value each time.
//
//The purpose of this assignment is to write one function and then call it over and over again.By putting the "function call" inside a loop, it will be called each time the loop happens.
//Remember to put a comment just before each function.
//Limit the code to that presented in chapters 2 - 6.5.

//include iostream, iomanip
#include <iostream>
#include <iomanip>

//using namespace
using namespace std;

//function prototype
void displayTable(int);

//global constant
const int WIDTH_G = 4;

//this function gets two numbers from the user,
//validates them, and passes them to the function
//displayTable to create a multiplication table.
int main()
{
	int num1 = 0, num2 = 0;
	
	cout << "Enter the range of values for which you would like multiplication tables: ";
	cout << endl << "Lower Range: ";
	cin >> num1;
	cout << "Upper Range: ";
	cin >> num2;
	cout << endl;

	while (num1 > num2)
	{
		cout << "Error. Please enter the upper range: ";
		cin >> num2;
	}

	for (int count = 0; count <= (num2 - num1); count++)
	{
		int tableValue = num1 + count;
		cout << "The multiplication table for " << tableValue << ":" << endl;
		displayTable(tableValue);
		cout << endl;
	}

	return 0;
}

//this function recieves a value from the main function and runs the
//number through a for loop to create a multiplication table
void displayTable(int tableValue)
{
	for (int count = 0; count < 13; count++)
	{
		cout <<  left << tableValue << " x " << right << setw(WIDTH_G) << count << " = " << setw(WIDTH_G) << tableValue * count << endl;
	}
	return;
}