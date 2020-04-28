//Chase Mortensen A01535275
#include "Date.h"

Date::Date()
	:m_day(1),
	m_month(1),
	m_year(2000)
{}

Date::Date(int month, int day, int year)
{
	setMonth(month);
	setYear(year);
	setDay(day);
}

int Date::getYear() { return m_year; }

int Date::getMonth() { return m_month; }

int Date::getDay() { return m_day; }

void Date::printLong(ostream& print)
{
	int month = m_month - 1;
	string monthName[12];

	monthName[0] = "January";
	monthName[1] = "February";
	monthName[2] = "March";
	monthName[3] = "April";
	monthName[4] = "May";
	monthName[5] = "June";
	monthName[6] = "July";
	monthName[7] = "August";
	monthName[8] = "September";
	monthName[9] = "October";
	monthName[10] = "November";
	monthName[11] = "December";

	if (m_year != 0)
	{
		print << monthName[month] << " " << m_day << ", " << m_year;
	}
	else if (m_year == 0)
	{
		print << monthName[month] << " " << m_day;
	}
}

void Date::printShort(ostream& print)
{
	if (m_year != 0)
	{
		print << m_month << "/" << m_day << "/" << m_year;
	}
	else if (m_year == 0)
	{
		print << m_month << "/" << m_day;
	}
}

void Date::setDate(int month, int day, int year)
{
	setMonth(month);
	setYear(year);
	setDay(day);
}

void Date::setDay(int day)
{
	int i, limit;
	if (m_month == 1 || m_month == 3 || m_month == 5 || m_month == 7
		|| m_month == 8 || m_month == 10 || m_month == 12)
	{
		i = 0;
	}
	else if (m_month == 4 || m_month == 6 || m_month == 9 || m_month == 11)
	{
		i = 1;
	}
	else if (m_month == 2)
	{
		if ((m_year % 4 == 0 && m_year % 100 != 0) || m_year % 400 == 0)
		{
			i = 2;
		}
		else if (m_year % 4 != 0 || m_year % 100 == 0)
		{
			i = 3;
		}
	}

	switch (i)
	{
	case 0: limit = 31;
		break;
	case 1:	limit = 30;
		break;
	case 2: limit = 29;
		break;
	case 3: limit = 28;
		break;
	}
	if (day > 0 && day <= limit)
	{
		m_day = day;
	}
	else
	{
		m_day = 1;
	}
}

void Date::setMonth(int month)
{
	if (month >= 1 && month <= 12)
	{
		m_month = month;
	}
	else
	{
		m_month = 1;
	}
	setDay(m_day);
}

void Date::setYear(int year)
{
	if (year >= 0 && year <= 3000)
	{
		m_year = year;
	}
	else
	{
		m_year = 0;
	}

	setDay(m_day);
}