#include <iostream>
#include <string>
#include <cmath>
#include <iomanip>
using namespace std;

int fact(int n) {
	int result = n--;
	while (n > 0) {
		result *= n--;
	}
	return result;
}

void error();

void e(int n) {
	cout << fixed;
	cout << setprecision(20);
	if (n > 0 && n < 31) {
		long double approx = 1.0;
		for (int i = 1; i <= n; i++) {
			approx += 1.0 / fact(i);
		}
		cout << approx << endl;
	}
	else {
		cout << "Error: " << n << " is out of range for function 'e'\n\n";
		error();
	}
}