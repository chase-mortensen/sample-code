#include <iostream>
#include <string.h>
#include <cmath>
#include <iomanip>
#include <signal.h>
#include <chrono>
#include <unistd.h>
#include <stdio.h>

#include "c++lang.hpp"
#include "filesystem.hpp"
#include "io.hpp"
#include "process.hpp"


bool quittingTime = false;
bool cc = false;
const char* src = "~/gradle-app.setting";
const char* dst = "~/assn3/out";
std::string tmp;

char* tmpp = NULL;

void menu();
void loop(int process, std::string name);
void input(char cmd);
void sigint(int signal __attribute__((unused)));

int main(int argc, char* argv[]){
    
	signal(SIGINT, sigint);
	signal(SIGUSR2, sigint);
	char cmd = '@';
	
	std::cout << "argc: " << argc << std::endl;
	for(int i = 0; i < argc; i++){
		std::cout << "argv[" << i << "] " << argv[i] << std::endl;
	}

	if (argc > 1) {
		for (int i = 0; i < argc; i++){
			tmp = std::string(argv[i]);
			std::cout << "tmp.length() = " << tmp.length() << std::endl;
			if (tmp.length() == 1){
				cmd = (char)argv[i][0];
			}
		}
		for (int i = 0; i < argc; i++){
			tmp = std::string(argv[i]);
			if (tmp.length() > 1){
				tmpp = argv[i];
				break;
			}
		}
	}

	std::cout << "cmd: " << cmd << std::endl;
	
	input(cmd);
    
	return 0;
}

void sigint(int signal __attribute__((unused))){
	if (signal == SIGINT){
		quittingTime = true;
		menu();
	}
	
}

void input(char cmd){
	quittingTime = false;
	menu();

	switch(cmd){
	
		case '0':
		loop(0, "C++ arithmetic");
		break;

		case '1':
		loop(1, "Math Library()");
		break;

		case '2':
		loop(2, "new/delete char[1]");
		break;

		case '3':
		loop(3, "new char[1]");
		break;

		case '4':
		loop(4, "kill(0)");
		break;

		case '5':
		loop(5, "kill(SIGUSR2)");
		break;

		case '6':
		loop(6, "nanosleep(1) 10,000 times (1,000,000 was boring)");
		break;

		case '7':
		loop(7, "nanosleep(1,000) 10,000 times (1,000,000 was boring)");
		break;

		case '8':
		loop(8, "nanosleep(1,000,000) 10,000 times (1,000,000 was boring)");
		break;

		case '9':
		loop(9, "fork() 10,000 times");
		break;

		case 'a':
		case 'A':
		loop(10, "getcwd()");
		break;

		case 'b':
		case 'B':
		loop(11, "chdir()");
		break;

		case 'c':
		case 'C':
		loop(12, "access(/proc/self/exe)");
		break;

		case 'd':
		case 'D':
		loop(13, "sync()");
		break;
			
		case 'e':
		case 'E':
		loop(14, "chmod()");
		break;
			
		case 'f':
		case 'F':
		loop(15, "dup2()");
		break;
			
		case 'g':
		case 'G':
		loop(16, "I/O bound loop over /dev/mmcblk0");
		break;
			
		case 'q':
		case 'Q':
		quittingTime = true;
		std::cout << "Quitting program...\n";
		exit(0);
		break;

		case '@':
		break;

		default:
		std::cout << "Invalid input.\n\n";
		break;
	}

	std::cin >> tmp;
		
	if (tmp.length() == 1)
		cmd = (char)tmp[0];
	else
		cmd = 'x';

	input(cmd);
}

void menu() {
	std::cout << "\nTime wasting main menu (v0.0) PID: " << ::getpid();
	std::cout << "\n\t0) C++ arithmetic";
	std::cout << "\n\t1) Math Library()";
	std::cout << "\n\t2) new/delete char[1]";
	std::cout << "\n\t3) new char[1]";
    std::cout << "\n\t4) kill(0)";
    std::cout << "\n\t5) kill(SIGUSR2)";
    std::cout << "\n\t6) nanosleep(1)";
    std::cout << "\n\t7) nanosleep(1,000)";
    std::cout << "\n\t8) nanosleep(1,000,000)";
    std::cout << "\n\t9) fork()";
    std::cout << "\n\ta) getcwd()";
    std::cout << "\n\tb) chdir()";
    std::cout << "\n\tc) access(/proc/self/exe)";
    std::cout << "\n\td) sync()";
    std::cout << "\n\te) chmod()";
    std::cout << "\n\tf) dup2()";
    std::cout << "\n\tg) I/O bound loop over /dev/mmcblk0";
    std::cout << "\n\tq) quit this fine program\n\n";
}

void loop(int function, std::string name){
	int i = 0;
	while (!quittingTime){
		
		auto before = std::chrono::high_resolution_clock::now();
		while(i < 1000000 && !quittingTime){
			switch(function){
				case 0:
				arithmetic();
				break;
			
				case 1:
				math();
				break;

				case 2:
				allocate();
				break;

				case 3:
				leak();
				break;

				case 4:
				killZero();
				break;

				case 5:
				kill2();
				break;

				case 6:
				sleep1();
				i += 99;
				break;

				case 7:
				sleep2();
				i += 99;				
				break;

				case 8:
				sleep3();
				i += 99;
				break;

				case 9:
				doFork();
				i += 99;
				break;

				case 10:
				doGetcwd();
				break;
				
				case 11:
				doChdir();
				break;

				case 12:
				doAccess();
				break;

				case 13:
				doSync();
				break;

				case 14:
				doChmod();
				break;

				case 15:
				doDup2();
				break;

				case 16:
				if (tmpp == NULL)
					fileIO(src, dst);
				else
					fileIO(tmpp, dst);
				break;
			}
			i++;
		}
		i = 0;
		if (!quittingTime){
			auto after = std::chrono::high_resolution_clock::now();
			std::chrono::duration<double> dur = after - before;
			std::cout << "It took " << dur.count() << " seconds to perform " << name << "\n";
		}
	}
}
