#include <iostream>
#include <algorithm>
#include <string>
#include <sstream>
#include <vector>
#include <chrono>
#include <cstdlib>
#include <ctime>
#include "TestCases.hpp"

std::string collapseSpaces(std::string s);
std::vector<std::string> split(std::string s);
bool isPalindrome(std::string word, int start, int end);
bool isWordSymmetric(const std::vector<std::string>& words, int start, int end);
long vectorSum(const std::vector<int>& data, unsigned int position);
int vectorMin(const std::vector<int>& data, unsigned int position);
void quickSort(std::vector<int>& data, int start, int end);
void selectionSort(std::vector<int>& data, int start, int end);

int main()
{
	TestCases::runTestCases();
}

// ------------------------------------------------------------------
//
// Provided code to remove spaces from a string (and capitalize it)
//
// ------------------------------------------------------------------
std::string collapseSpaces(std::string s)
{
	s.erase(std::remove_if(s.begin(), s.end(), isspace), s.end());
	std::transform(s.begin(), s.end(), s.begin(), toupper);	// Capitalize all
	return s;
}

// ------------------------------------------------------------------
//
// Solution string split code
//
// ------------------------------------------------------------------
std::vector<std::string> split(std::string s)
{
	std::istringstream is(s);
	std::vector<std::string> words;

	do
	{
		std::string word;
		is >> word;
		if (word.length() > 0)
		{
			words.push_back(word);
		}
	} while (is);

	return words;
}

// Is Palindrome Function NEED HELP
bool isPalindrome(std::string word, int start, int end)
{
	collapseSpaces(word);
	if (start >= end)
		return true;
	else if (word[start] == word[end])
		return isPalindrome(word, start + 1, end - 1);
	else if (word[start] != word[end])
		return false;
}

// Is Word Symmetric Function
bool isWordSymmetric(const std::vector<std::string>& words, int start, int end)
{
	if (start >= end)
		return true;
	else if (words[start] == words[end])
		return isWordSymmetric(words, start + 1, end - 1);
	else if (words[start] != words[end])
		return false;
}

// Vector Sum Function NEED HELP
long vectorSum(const std::vector<int>& data, unsigned int position)
{
	if (data.size() == 0)
		return 0;
	else if (position < data.size() - 1 && data.size() > 1)
		return data[position] + vectorSum(data, position + 1);
	else if (data.size() == 1)
		return data[position];
	else
		return data[position];
}

//Vector Min Function
int vectorMin(const std::vector<int>& data, unsigned int position)
{
	if (position == data.size() - 1)
		return data[position];
	if (data[position] < vectorMin(data, position + 1))
		return data[position];
	else
		return vectorMin(data, position + 1);
}

// ------------------------------------------------------------------
//
// Provided quicksort partition code
//
// ------------------------------------------------------------------
int partition(std::vector<int>& data, int start, int end)
{
	int middle = (start + end) / 2;
	std::swap(data[start], data[middle]);
	int pivotIndex = start;
	int pivotValue = data[start];
	for (int scan = start + 1; scan <= end; scan++)
	{
		if (data[scan] < pivotValue)
		{
			pivotIndex++;
			std::swap(data[scan], data[pivotIndex]);
		}
	}

	std::swap(data[pivotIndex], data[start]);

	return pivotIndex;
}

// ------------------------------------------------------------------
//
// Provided quicksort code
//
// ------------------------------------------------------------------
void quickSort(std::vector<int>& data, int start, int end)
{
	if (start < end && data.size() > 10)
	{
		int pivot = partition(data, start, end);
		quickSort(data, start, pivot - 1);
		quickSort(data, pivot + 1, end);
	}
	else if (data.size() <= 10)
	{
		selectionSort(data, start, end);
	}
}

void selectionSort(std::vector<int>& data, int start, int end)
{
	if (start >= end)
		return;
	int minIndex = start;
	for (int index = start; index <= end; index++)
	{
		if (data[index] < data[minIndex])
			minIndex = index;
	}
	int temp = data[start];
	data[start] = data[minIndex];
	data[minIndex] = temp;
	selectionSort(data, start + 1, end);
}
