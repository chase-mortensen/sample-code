#include <iostream>
#include <string>
#include <cmath>
#include <iomanip>
using namespace std;

void error();

void fib(int n) {
	if (n >= 0 && n < 41) {
		int a = 0, b = 1, tmp = 0;
		for (int i = 0; i < n; i++) {
			tmp = a + b;
			a = b;
			b = tmp;
		}
		cout << a << endl;
	}
	else {
		cout << "Error: " << n << " is out of range for function 'fib'\n\n";
		error();
	}
}