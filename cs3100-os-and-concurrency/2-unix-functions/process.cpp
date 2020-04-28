#include <signal.h>
#include <unistd.h>
#include <time.h>
#include <iostream>
#include <stdio.h>
#include <sys/wait.h>
#include <sys/stat.h>

extern bool quittingTime;

int id = ::getpid();

struct timespec wait1;

void killZero(){
    kill(id, 0);
}

void kill2(){
    kill(id, SIGUSR2);
}

void sleep1(){
    wait1.tv_nsec = 1;
    nanosleep(&wait1, NULL);
}

void sleep2(){
    wait1.tv_nsec = 1000;
    nanosleep(&wait1, NULL);
}

void sleep3(){
    wait1.tv_nsec = 1000000;
    nanosleep(&wait1, NULL);
}

void doFork(){
    pid_t kiddo;
    if ((kiddo = fork()) != 0) {
        wait(NULL);
    }
    else
        exit(0);

}
