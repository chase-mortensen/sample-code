#define _USE_MATH_DEFINES

#include <cstdlib>
#include <iostream>
#include <ctime>
#include <utility>
#include <chrono>
#include <cmath>

#include "TestCases.hpp"

SortStats bubbleSort(std::vector<int>& list);

SortStats selectionSort(std::vector<int>& list);

// ------------------------------------------------------------------
//
// Run the test cases to help verify the code is correct.
//
// ------------------------------------------------------------------
void runTestCases()
{
	executeTest(testCase1, bubbleSort, "Bubble Sort: 10 items");
	executeTest(testCase2, bubbleSort, "Bubble Sort: 500 items");
	executeTest(testCase3, bubbleSort, "Bubble Sort: 100 to 1000 items");

	executeTest(testCase1, selectionSort, "Selection Sort: 10 items");
	executeTest(testCase2, selectionSort, "Selection Sort: 500 items");
	executeTest(testCase3, selectionSort, "Selection Sort: 100 to 1000 items");

	executeTest(testCaseCompare, bubbleSort, selectionSort, "Sort Compare Test");
}

//Bubble Sort
SortStats bubbleSort(std::vector<int>& list)
{
	SortStats bubbleStats;
	bubbleStats.compareCount = 0;
	bubbleStats.swapCount = 0;
	bubbleStats.time = 0;

	//Start Bubble Timer
	std::chrono::time_point<std::chrono::high_resolution_clock> startBubble = std::chrono::high_resolution_clock::now();

	bool swapped = false;
	do
	{
		swapped = false;
		for (unsigned int i = 0; i < list.size() - 1; i++)
		{
			bubbleStats.compareCount++;
			if (list[i] > list[i + 1])
			{
				std::swap(list[i], list[i + 1]);
				swapped = true;
				bubbleStats.swapCount++;
			}
		}
	} while (swapped);

	//End bubble timer and compute duration
	std::chrono::time_point<std::chrono::high_resolution_clock> endBubble = std::chrono::high_resolution_clock::now();
	std::chrono::duration<double> time = endBubble - startBubble;
	bubbleStats.time = time.count();

	return bubbleStats;
}

//Selection Sort
SortStats selectionSort(std::vector<int>& list)
{
	SortStats selectionStats;
	selectionStats.compareCount = 0;
	selectionStats.swapCount = 0;
	selectionStats.time = 0;

	//Start Selection Timer
	std::chrono::time_point<std::chrono::high_resolution_clock> startSelection = std::chrono::high_resolution_clock::now();

	for (unsigned int start = 0; start < list.size() - 1; start++)
	{
		unsigned int low = start;
		for (unsigned int scan = start; scan < list.size(); scan++)
		{
			selectionStats.compareCount++;
			if (list[low] > list[scan])
			{
				low = scan;
			}
		}
		std::swap(list[low], list[start]);
		selectionStats.swapCount++;
	}

	//End selection timer and compute duration
	std::chrono::time_point<std::chrono::high_resolution_clock> endSelection = std::chrono::high_resolution_clock::now();
	std::chrono::duration<double> time = endSelection - startSelection;
	selectionStats.time = time.count();

	return selectionStats;
}

std::vector<int> generateVector(int size)
{
	std::vector<int> myVector;

	for (int i = 0; i < size; i++)
	{
		myVector.push_back(rand() % size);
	}
	
	return myVector;
}

int main()
{
	std::srand(static_cast<unsigned int>(std::time(NULL)));

	std::cout << "Timing Results:\n\n";

	//Loop
	for (unsigned int i = 100; i <= 1000; i += 100)
	{
		std::cout << "Vector Size : " << i << std::endl;

		//Create Bubble Vector
		std::vector<int> bubbleVector = generateVector(i);

		//Sort Bubble Vector
		SortStats bubble = bubbleSort(bubbleVector);
		
		//Print
		std::cout << "Bubble      : " << bubble.time << " seconds" << std::endl;

		//Create Selection Vector
		std::vector<int> selectionVector = generateVector(i);

		//Sort Selection Vector
		SortStats selection = selectionSort(selectionVector);

		//Print
		std::cout << "Selection   : " << selection.time << " seconds\n\n";
	}
	
	runTestCases();

	return 0;
}