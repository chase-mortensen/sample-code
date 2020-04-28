#include <iostream>
#include <string>
#include <cmath>
#include <iomanip>
using namespace std;

void error();

void pi(int n) {
	string pi = "1415926535";
	if (n > 0 && n < 11) {
        cout << "3.";
        for (int i = 0; i < n; i++){
            cout << pi[i];
        }
        cout << endl;
	}
	else {
		cout << "Error: " << n << " is out of range for function 'pi'\n\n";
		error();
	}
}