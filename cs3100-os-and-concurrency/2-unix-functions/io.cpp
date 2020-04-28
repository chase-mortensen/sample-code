#include <iostream>
#include <string>
#include <cmath>
#include <iomanip>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

//I have to cite https://support.dce.felk.cvut.cz/pos/os_api/unix-4.html#read
//here - it was a big help and I modified some of the code I found there

#define MODE (S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH)

extern bool quittingTime;


void fileIO(const char* src, const char* dst){
    //int open(char *path, int oflag, ...);
    int s, d, r;
    char buf[BUFSIZ];

    s = open(src, O_RDONLY);

    d = creat(dst, MODE);
  
    r = read(s, buf, BUFSIZ);
    
    write(d, buf, r);

    close(s);
    close(d);
}

