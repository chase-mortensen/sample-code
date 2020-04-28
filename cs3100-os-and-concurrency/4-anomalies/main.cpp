#include <algorithm>
#include <iostream>
#include <random>
#include <vector>                                                                                                         

/* global constants */
const int SEQUENCE_SIZE     = 1000; 
const unsigned int PAGE_MIN = 1;
const unsigned int PAGE_MAX = 250;

/* This code is in a function */
std::vector<unsigned int> randomSequence(){
	std::random_device rd;
	std::mt19937 engine{rd()};
	std::uniform_int_distribution<unsigned int> dist{PAGE_MIN, PAGE_MAX};

	std::vector<unsigned int> sequence;
	sequence.resize(SEQUENCE_SIZE);
	std::generate(sequence.begin(), sequence.end(), [&](){ return dist(engine); });
	return sequence;
}

int main(){
	std::vector<std::vector<unsigned int>> allSequences;
	std::vector<std::vector<unsigned int>> results;
	std::vector<unsigned int> tmp;
	for (int i = 0; i < 100; i++){
		allSequences.push_back(randomSequence());
		results.push_back(tmp);
	}

	for (int i = 0; i < 100; i++){  // This loop is for each of the 100 sequences

		for (int currentFrameSize = 1; currentFrameSize <= 100; currentFrameSize++){  // This loop is for each of the frame sizes [1..100]
			std::vector<unsigned int> currentFifo;
			unsigned int pageFaults = 0;
			bool found = false;
			for (int j = 0; j < SEQUENCE_SIZE; j++){  // This loop is for each of the 1000 elements in an individual sequence
				if (j < currentFrameSize){
					for (unsigned int k = 0; k < currentFifo.size(); k++){
						if (allSequences[i][j] == currentFifo[k]){
							found = true;
							break;
						}
					}	
				}
				else {
					int back = currentFifo.size() - 1;
					for (int k = 0; k < currentFrameSize; k++){
						if (allSequences[i][j] == currentFifo[back - k]){
							found = true;
							break;
						}
					}
				}
				if (!found){
						currentFifo.push_back(allSequences[i][j]);
						pageFaults++;
					}
					found = false;
			}
			results[i].push_back(pageFaults);
		}
	}

	unsigned int anomalies = 0;
	for (int sequence = 0; sequence < 100; sequence++){
		for (int frameSize = 1; frameSize < 100; frameSize++){
			if (results[sequence][frameSize] > results[sequence][frameSize - 1]){
				anomalies++;
				std::cout << "\nAnomaly Discovered!\n\tSequence: " << sequence << "\n\tPage Faults: " << results[sequence][frameSize - 1] <<
				" @ Frame Size: " << frameSize - 1 << "\n\tPage Faults: " << results[sequence][frameSize] <<
				" @ Frame Size: " << frameSize;
			}
		}
	}
	std::cout << "\n\nNumber of Anomalies: " << anomalies;
	std::cout << "\n\n";

	return 0;
}
