#include <iostream>
#include <algorithm>
#include <cmath>
#include <vector>

#include "BigInteger.hpp"


BigInteger::BigInteger()
{
	m_sizeReserved = 4;
	m_digitCount = 0;
	m_number = new uint8_t[m_sizeReserved];
}

BigInteger::BigInteger(int integer)
{
	std::string stringNum = std::to_string(integer);
	stringToBig(stringNum);
}

BigInteger::BigInteger(std::string intString)
{
	stringToBig(intString);
}

BigInteger::BigInteger(const BigInteger & rhs)
{
	m_digitCount = rhs.m_digitCount;
	m_sizeReserved = rhs.m_sizeReserved;
	m_number = new uint8_t[m_sizeReserved];

	for (unsigned int i = 0; i < m_digitCount; i++)
	{
		m_number[i] = rhs.m_number[i];
	}
}


BigInteger BigInteger::add(const BigInteger& rhs)
{
	BigInteger result;
	unsigned int length = (this->m_digitCount > rhs.m_digitCount) ? this->m_digitCount : rhs.m_digitCount;

	int carry = 0;
	for (unsigned int digit = 0; digit < length; digit++)
	{
		int v1 = this->getDigit(digit);
		int v2 = rhs.getDigit(digit);
		int sum = v1 + v2 + carry;
		int single = sum % 10;
		carry = ((sum - single) > 0) ? (sum - single) / 10 : 0;

		result.setDigit(digit, single);
	}
	if (carry > 0)
	{
		result.setDigit(length, carry);
	}

	return result;
}

BigInteger BigInteger::multiply(const BigInteger& rhs)
{
	BigInteger result;
	const BigInteger& b = (this->m_digitCount < rhs.m_digitCount) ? *this : rhs;
	const BigInteger& t = (this->m_digitCount < rhs.m_digitCount) ? rhs : *this;

	for (unsigned int bDigit = 0; bDigit < b.m_digitCount; bDigit++)
	{
		BigInteger temp(0);
		int v1 = b.getDigit(bDigit);
		int carry = 0;
		for (unsigned int tDigit = 0; tDigit < t.m_digitCount; tDigit++)
		{
			int v2 = t.getDigit(tDigit);
			int sum = v1 * v2 + carry;
			int single = sum % 10;
			carry = ((sum - single) > 0) ? (sum - single) / 10 : 0;

			temp.setDigit(bDigit + tDigit, single);
		}
		if (carry > 0)
		{
			temp.setDigit(bDigit + t.m_digitCount, carry);
		}
		BigInteger temp2 = result.add(temp);
		result = temp2;
	}

	return result;
}

BigInteger& BigInteger::operator=(const BigInteger & rhs)
{
	if (m_number)
	{
		delete[]m_number;
	}
	m_digitCount = rhs.m_digitCount;
	m_sizeReserved = rhs.m_sizeReserved;
	m_number = new uint8_t[m_sizeReserved];

	for (unsigned int i = 0; i < m_digitCount; i++)
	{
		m_number[i] = rhs.m_number[i];
	}
	
	return *this;
}

BigInteger::~BigInteger()
{
	delete[]m_number;
}

void BigInteger::display()
{
	for (unsigned int digit = m_digitCount; digit > 0; digit--)
	{
		std::cout << static_cast<int>(m_number[digit - 1]);
	}
}


void BigInteger::stringToBig(std::string intString)
{
	m_sizeReserved = m_sizeReserved = 4;
	m_number = new uint8_t(m_sizeReserved);
	unsigned int size = 4;
	m_digitCount = intString.length();
	
	while (m_sizeReserved <= m_digitCount)
	{
		m_sizeReserved = (m_sizeReserved * 2);
	}

	if (m_sizeReserved != size)
	{
		m_number = new uint8_t[m_sizeReserved];
		size = m_sizeReserved;
	}

	//for (int i = 0; i < m_sizeReserved; i++)
	//{
	//	setDigit(i, 0); //m_number[i] = 0;
	//}


	for (unsigned int i = 0; i < m_digitCount; i++)
	{
		m_number[i] = intString[(m_digitCount - i - 1)] - '0';
	}
}


// ------------------------------------------------------------------
//
// Returns the digit as the specified positon.  If the position is greater
// that the number representation, a 0 is returned.
//
// ------------------------------------------------------------------
std::uint8_t BigInteger::getDigit(unsigned int position) const
{
	if (position < m_digitCount)
	{
		return m_number[position];
	}

	return 0;
}

void BigInteger::setDigit(unsigned int position, std::uint8_t digit)
{
	if (m_sizeReserved < position)
	{
		while (m_sizeReserved < position)
		{
			m_sizeReserved = (2 * m_sizeReserved);
		}
		uint8_t* number = new uint8_t[m_sizeReserved];

		for (int i = 0; i < m_digitCount; i++)
		{
			number[i] = m_number[i];
		}

		delete[]m_number;
		m_number = number;
	}

	m_number[position] = digit;
	m_digitCount = position + 1;
}