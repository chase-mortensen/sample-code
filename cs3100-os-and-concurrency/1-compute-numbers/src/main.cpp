#include <iostream>
#include <string>
#include <cmath>
#include <iomanip>

#include "compute-fib.hpp"
#include "compute-pi.hpp"
#include "compute-e.hpp"
using namespace std;

void error() {
	cout << "--- Assign 1 Help ---\n";
	cout << "-fib [N] : Compute the Fibonacci of [N] (0 <= N <= 40)\n";
	cout << "-e [N]   : Compute the value of 'e' using [N] iterations (1 <= N <= 30)\n";
	cout << "-pi [N]  : Display Pi to [N] digits (1 <= N <= 10)\n";
}

int main(int argc, char* argv[]){
    
	if (argc < 3) {
		error();
	}
	else {
		string cmd = string(argv[1]);
		if (cmd == "-fib")
			fib(stoi(argv[2]));
		else if (cmd == "-e")
			e(stoi(argv[2]));
		else if (cmd == "-pi")
			pi(stoi(argv[2]));
		else
			error();
	}
    
	return 0;
}