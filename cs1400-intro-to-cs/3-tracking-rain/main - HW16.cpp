//Chase Mortensen A01535275
#include <iostream>
#include <fstream>
#include <iomanip>
using namespace std;


const int RAIN = 12, YEARS = 8, WIDTH = 5;

//A function that reads the data from the file. Read this data into 
//two arrays.Each year is to go into a 1 - D array.The precipitation 
//amounts are to go into a 2 - D array.Since this is the only function 
//that will need to access the file, define, open, and close the file 
//in this function.If the file does not open for some reason you will 
//want to print an error message and shut the program down.When we were 
//in main and tested for file open errors, we could shut the program 
//down simply by using the return 0; statement.Now that we are in another 
//function return will not shut the program down.It will simply shut the 
//function down and return to main.So use the exit command instead of the 
//return command.
void readData(int years[YEARS], double precipitation[YEARS][RAIN]);

//A function that prints the data to the screen. Have the function 
//print the data in table format. Use the year array to label each 
//row with the correct year.
void print(int years[YEARS], double precipitation[YEARS][RAIN]);

//main function
//In main, define the arrays that will be used to store the data and 
//call the other functions as needed to fill the array and print the 
//table of rainfall to the screen.
//Then compute and report(to the screen) the total precipitation for 
//the third year in the data.Label this output so the user knows what 
//is being output.Include the year - from the year array - in the output.
//Finally have the program report(to the screen) the total precipitation 
//in May for all the years.The precipitation values are in order starting 
//in January.That would mean the May precipitation values are in the 
//fifth column.Label this output so the user knows what is being output.
int main()
{
	int years[YEARS];
	double precipitation[YEARS][RAIN], thirdTotal, mayTotal;
	readData(years, precipitation);
	print(years, precipitation);

	thirdTotal = 0;
	for (int j = 0; j < RAIN; j++)
	{
		thirdTotal += precipitation[2][j];
	}
	cout << "Year 3 total: " << thirdTotal << endl << endl;

	mayTotal = 0;
	for (int i = 0; i < YEARS; i++)
	{
		mayTotal += precipitation[i][4];		
	}
	cout << "May total: " << mayTotal << endl << endl;

	return 0;
}

void readData(int years[YEARS], double precipitation[YEARS][RAIN])
{
	
	fstream fin("rainfall.txt");
	if (fin.fail())
	{
		cout << "An error occurred while opening the file." << endl;
		exit(0);
	}

	for (int i = 0; i < YEARS; i++)
	{
		fin >> years[i];		
		for (int j = 0; j < RAIN; j++)
		{
			fin >> precipitation[i][j];			
		}
	}
	fin.close();
}

void print(int years[YEARS], double precipitation[YEARS][RAIN])
{
	cout << "Year" << setw(WIDTH) << "\t\t\tPrecipitation";

	for (int i = 0; i < YEARS; i++)
	{
		cout << endl << years[i];
		for (int j = 0; j < RAIN; j++)
		{
			cout << fixed << setprecision(1) << setw(WIDTH) << precipitation[i][j];
		}
		
	}

	cout << endl << endl;
}