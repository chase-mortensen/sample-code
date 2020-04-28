#include <iostream>
#include <string>
#include <cmath>
#include <iomanip>

extern bool quittingTime;
int i __attribute__((unused)) = 0;

void arithmetic(){
    i += 1;
}

void math(){
    sqrt(99);
}

void allocate(){
    char* c __attribute__((unused)) = new char;
    delete c;
}

void leak(){
    char* c __attribute__((unused)) = new char;
}
