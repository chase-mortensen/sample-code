#include <iostream>
#include <thread>
#include <vector>
#include <memory>
#include <vector>
#include <queue>

#include "computePi.hpp"
#include "q.hpp"
#include "v.hpp"


//std::mutex m1, m2;
//std::queue<uint16_t>& taskQueue, std::unordered_map<int, int>& pi
void threadWorker(q& tq, v& p) {
// TODO: This function will take a reference to the FIFO task queue as an argument
// TODO: This function will take a reference to your unordered_map as an argument
	
    //std::cout << "Hi! I'm thread number " << threadNum << ".\n";

	while(!tq.empty()){
		std::cout << ".";
		std::cout.flush();
		int i = tq.pop();
		p.insert(i - 1, computePiDigit(i));
	}
}

int main() {
// TODO: Initialize your thread-safe data structures here
	
	v pi;
	q taskQueue;

	for(int i = 0; i < 1000; i++){
		taskQueue.push(i + 1);
		pi.push(-1);
	}

	//
	// Make as many threads as there are CPU cores
    // Assign them to run our threadWorker function, and supply arguments as necessary for that function
	std::vector<std::shared_ptr<std::thread>> threads;
	for (std::uint16_t core = 0; core < std::thread::hardware_concurrency(); core++)
        // The arguments you wish to pass to threadWorker are passed as
        // arguments to the constructor of std::thread
		//threads.push_back(std::make_shared<std::thread>(threadWorker, core, &taskQueue, &pi));
		threads.push_back(std::make_shared<std::thread>(threadWorker, std::ref(taskQueue), std::ref(pi)));

	//
	// Wait for all of these threads to complete
	for (auto&& thread : threads)
		thread->join();

	std::cout << std::endl << std::endl;

	// TODO: Print the digits of PI from our unordered_map, in order


	std::cout << "3.";
	for (int i = 0; i < 1000; i++){
		std::cout << pi.at(i);
	}

	std::cout << std::endl << std::endl;

	return 0;
}
