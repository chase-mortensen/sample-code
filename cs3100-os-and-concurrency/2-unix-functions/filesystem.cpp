#include <signal.h>
#include <unistd.h>
#include <time.h>
#include <iostream>
#include <stdio.h>
#include <sys/stat.h>


char buf[BUFSIZ];

void doGetcwd(){
    getcwd(buf, BUFSIZ);
}

void doChdir(){
    chdir("");
}

void doAccess(){
    access("/proc/self/exe", R_OK);
}

void doSync(){
    sync();
}

void doChmod(){
    chmod("/home/chase/IdeaProjects/LucidChallenge/LucidChallenge.iml", R_OK);
}

void doDup2(){
    dup2(1,2);
}
