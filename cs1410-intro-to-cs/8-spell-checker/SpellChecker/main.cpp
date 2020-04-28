#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
#include <locale>


#include "BinaryTree.h"

void testTree()
{
	BinaryTree<std::string> tree;
	//
	// Add a bunch of values to the tree
	tree.insert("Olga");
	tree.insert("Tomeka");
	tree.insert("Benjamin");
	tree.insert("Ulysses");
	tree.insert("Tanesha");
	tree.insert("Judie");
	tree.insert("Tisa");
	tree.insert("Santiago");
	tree.insert("Chia");
	tree.insert("Arden");

	//
	// Make sure it displays in sorted order
	tree.display();

	//
	// Try to add a duplicate
	std::cout << std::endl << "---- adding a duplicate ----" << std::endl;
	if (tree.insert("Tomeka"))
	{
		std::cout << "oops, shouldn't have returned true from the insert" << std::endl;
	}
	tree.display();

	//
	// Remove an existing value from the tree
	std::cout << std::endl << "---- removing an existing value ----" << std::endl;
	tree.remove("Olga");
	tree.display();

	//
	// Remove a value that was never in the tree, hope it doesn't crash!
	tree.remove("Karl");

	//
	// Check the tree stats
	std::cout << std::endl << "---- checking the tree stats ----" << std::endl;
	std::cout << "Expecting 9 nodes, found " << tree.numberNodes() << std::endl;
	std::cout << "Expecting 4 leaf nodes, found " << tree.numberLeafNodes() << std::endl;
	std::cout << "Expecting height of 6, found " << tree.height() << std::endl;
}

void myTest()
{
	BinaryTree<std::string> tree;
	//
	// Add a bunch of values to the tree
	tree.insert("Olga");
	tree.insert("Tomeka");

	std::cout << std::endl << "---- checking the tree stats ----" << std::endl;
	std::cout << "Expecting 2 nodes, found " << tree.numberNodes() << std::endl;
	std::cout << "Expecting 1 leaf nodes, found " << tree.numberLeafNodes() << std::endl;
	std::cout << "Expecting height of 2, found " << tree.height() << std::endl;

	tree.insert("Benjamin");
	tree.insert("Ulysses");

	std::cout << std::endl << "---- checking the tree stats ----" << std::endl;
	std::cout << "Expecting 4 nodes, found " << tree.numberNodes() << std::endl;
	std::cout << "Expecting 2 leaf nodes, found " << tree.numberLeafNodes() << std::endl;
	std::cout << "Expecting height of 3, found " << tree.height() << std::endl;

	tree.report();
}

int main()
{

	std::vector<std::string> words;
	std::string word;
	BinaryTree<std::string> myDictionary;
	std::vector<std::string> test;
	std::vector<std::string> original;

	std::ifstream inFile;
	inFile.open ("Dictionary.txt");
	if (inFile.is_open())
	{
		while (getline(inFile, word))
		{
			words.push_back(word);
			//std::cout << word << std::endl;
		}
		inFile.close();
	}
	else
		std::cout << "Error: File not open." << std::endl;

	std::random_shuffle(words.begin(), words.end());

	for (unsigned int i = 0; i < words.size(); i++)
	{
		myDictionary.insert(words[i]);
	}

	std::ifstream testFile;
	testFile.open("Letter.txt");
	if (!testFile.is_open())
		std::cout << "File not open." << std::endl;
	else
	{
		std::locale loc;
		while (testFile >> word)
		{
			original.push_back(word);
			for (unsigned int i = 0; i < word.length(); i++)
			{
				char letter = word[i];
				if (letter == 34 || letter == 44 || letter == 58 || letter == 46 || letter == 33 || letter == 63 || letter == 40 || letter == 41)
				{
					word.erase(word.begin() + i);
				}
				else
				{
					word[i] = std::tolower(word[i], loc);
				}
			}
			test.push_back(word);
		}
		testFile.close();
	}

	//std::cout << "myDictionary Size: " << myDictionary.numberNodes() << std::endl;
	//std::cout << "test Size: " << test.size() << std::endl;

	std::cout << "--- Words Not Recognized ---" << std::endl;

	for (unsigned int i = 0; i < test.size(); i++)
	{
		if (!myDictionary.search(test[i]))
		{
			std::cout << original[i] << std::endl;
		}
	}

	std::cout << std::endl;

	testTree();
	myTest();

	BinaryTree<std::string> testTree;
	for (unsigned int i = 0; i < original.size(); i++)
	{
		testTree.insert(original[i]);
	}

	testTree.report();
	myDictionary.report();
	return 0;
}