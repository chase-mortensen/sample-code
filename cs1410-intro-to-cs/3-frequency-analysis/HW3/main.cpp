#include <iostream>
#include <fstream>
#include <iomanip>
#include <utility>
#include <vector>
#include <string>

#include "Record.hpp"
#include "TestCases.hpp"

std::vector<unsigned int> readNumbersFromFile(std::string file)
{
	std::vector<unsigned int> v;
	std::fstream f;
	std::string sizeString;
	std::string temp;


	f.open(file);
	getline(f, sizeString);
	unsigned int size = stoi(sizeString);

	if (f.is_open())
	{ }
	else
	{
		std::cout << "File Error" << std::endl;
		exit(0);
	}

	for (unsigned int i = 0; i < size; i++)
	{
		getline(f, temp);
		v.push_back(stoi(temp));
	}

	f.close();

	return v;
}

bool binarySearch(std::vector<Record*>& records, unsigned int number)
{
	int begin = 0;
	int end = records.size() - 1;
	bool found = false;

	while (!found && begin <= end)
	{
		int middle = ((end + begin) / 2);
		if (records[middle]->getNumber() == number)
		{
			found = true;
			records[middle]->incrementFrequency();
		}
		else if (records[middle]->getNumber() < number)
		{
			begin = middle + 1;
		}
		else if (records[middle]->getNumber() > number)
		{
			end = middle - 1;
		}
	}

	return found;
}

void selectionSort(std::vector<Record*>& data) //most of this function is from the example code
{
	bool swapped = false;
	for (unsigned int start = 0; start < data.size() - 1; start++) 
	{
		unsigned int minPos = start; 
		for (unsigned int scan = start; scan < data.size(); scan++) 
		{
			if (data[minPos]->getNumber() > data[scan]->getNumber()) 
			{ 
				minPos = scan; 
				swapped = true;
			}
		} 
		if (swapped)
		{
			std::swap(data[start], data[minPos]);
		}
	}
}

std::vector<Record*> createVectorOfRecordsFromVectorOfNumbers(std::vector<unsigned int> &numbers)
{
	std::vector<Record*> records;
	bool exists = false;

	for (unsigned int i = 0; i < numbers.size(); i++)
	{
		if (records.empty())
		{
			records.push_back(new Record(numbers[i]));
		}
		else
		{
			exists = binarySearch(records, numbers[i]);

			if (!exists)
			{
				records.push_back(new Record(numbers[i]));
				selectionSort(records);
			}
		}
	}
	return records;
}

void sortByFrequency(std::vector<Record*>& data)
{
	bool swapped = false;
	for (unsigned int start = 0; start < data.size() - 1; start++)
	{
		unsigned int minPos = start;
		for (unsigned int scan = start; scan < data.size(); scan++)
		{
			if (data[minPos]->getFrequency() > data[scan]->getFrequency())
			{
				minPos = scan;
				swapped = true;
			}
		}
		if (swapped)
		{
			std::swap(data[start], data[minPos]);
		}
	}
}

void reportFrequencies(std::vector<Record*> records)
{
	unsigned int total = 0;
	unsigned int numberCount = 1;

	for (unsigned int i = 0; i < records.size(); i++)
	{
		if (records[i]->getFrequency() == records[i + 1]->getFrequency())
			numberCount++;
		else
		{
			std::cout << numberCount << " numbers with a count of " << records[i]->getFrequency() << std::endl;
			total += (records[i]->getFrequency() * numberCount);
			numberCount = 1;
		}
	}
	
	std::cout << "Total number of records: " << total << std::endl;
}

int main()
{
	std::vector<unsigned int> numbers = readNumbersFromFile("input.txt");
	std::cout << "numbers: " << numbers.size() << std::endl;
	std::vector<Record*> records = createVectorOfRecordsFromVectorOfNumbers(numbers);
	std::cout << "records: " << records.size() << std::endl;
	sortByFrequency(records);
	std::cout << "records: " << records.size() << std::endl;

	reportFrequencies(records);
	std::cout << "records: " << records.size() << std::endl;
	cleanDynamicMemory(records);	// Function stub found in TestCases.cpp

	// Test cases
	executeFreqTest(FreqTestCase1, createVectorOfRecordsFromVectorOfNumbers, "Frequency Test Case 1");
	executeFreqTest(FreqTestCase2, createVectorOfRecordsFromVectorOfNumbers, "Frequency Test Case 2");
	executeSortTest(SortTestCase1, sortByFrequency, "Sort Test Case 1");
	executeSortTest(SortTestCase2, sortByFrequency, "Sort Test Case 2");
	return 0;
}