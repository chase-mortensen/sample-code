//Chase Mortensen A01535275
#ifndef _DATE_H
#define _DATE_H
#include <iostream>
#include <string>
using namespace std;

//The Date class
//This class has three member variables
//month – an integer in the range of 1 - 12
//day – an integer within the range of the allowed month
//year – an integer in the range of 0 - 3000
class Date
{
public:
	//This is the default constructor. It is to set day to 1, month to 1, and year to 2000.
	Date();

	//This is another constructor. The parameters are in the following order: month, day,  year. 
	//Setting the year to 0 identifies that this date does not need a year.
	Date(int month, int day, int year = 0);

	//This is the get function for year. Returns an int.
	int getYear();

	//This is the get function for month. Returns an int.
	int getMonth();

	//This is the get function for day. Returns an int.
	int getDay();

	//This is the set function for year. It is to verify the year sent is from 0 to 3000 inclusive. 
	//If it is, set it to the sent value. If it is not within the correct range for the year, set it to 0.
	//Whenever you set the year, it is possible to change the range of the day. 
	//After setting the year, call the setDay function with the current value of day.
	//You will need to add this after you have finished the setDay function.
	void setYear(int year);

	//This is the set function for month. It is to verify the month sent is between 1-12. 
	//If it is, set it to the sent value. If it is not within the correct range for the month, set it to 1.
	//Whenever you set the month, it is possible to change the range of the day.
	//After setting the month, call the setDay function with the current value of day.
	//You will need to add this after you have finished the setDay function.
	void setMonth(int month);

	//This is the set function for month.It is to verify the month sent is between 1 - 12. 
	//If it is, set it to the sent value.If it is not within the correct range for the month, set it to 1.
	//Whenever you set the month, it is possible to change the range of the day.
	//After setting the month, call the setDay function with the current value of day.
	//You will need to add this after you have finished the setDay function.
	void setDay(int day);

	//This function is to print the Date using the following format: 
	//month / day / year Example: 3/28/2009
	//If the year is 0, print it using the following format: 
	//month / day Example : 12 / 25
	//It is to print the Date to the output stream sent to the function.
	void printShort(ostream& print);

	//This function is to print the Date using the following format: 
	//MonthName day, year Example : March 28, 2009
	//If the year is 0, print it using the following format : MonthName day
	//Example : December 25
	//It is to print the Date to the output stream sent to the function.
	void printLong(ostream& print);

	//This is a set function for an entire date. It is to call the appropriate set functions for month, day, and year. 
	//It is important that you set the month and the year before setting the day. 
	//Setting the year to 0 identifies that this date does not need a year.
	//When you are setting the date it is important to consider the order.
	//Identifying whether a day is valid depends on the month and year.
	//For example, 31 is a valid day for October but not for November. 
	//29 is a valid day for February 2012 but not for February 2013. 
	//So when you are setting the day, make sure the month and year are set before you set the day.
	void setDate(int month, int day, int year = 0);

private:
	int m_month;
	int m_day;
	int m_year;

};



#endif