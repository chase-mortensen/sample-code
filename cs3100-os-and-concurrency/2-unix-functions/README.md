Chase Mortensen
A01535275
Assn3

Observations while watching htop perform each of the following functions:
        0) C++ arithmetic
        1) Math library()
        2) new/delete char[1]
        3) new char[1]
        4) kill(0)
        5) kill(SIGUSR2)
        6) nanosleep(1)
        7) nanosleep(1,000)
        8) nanosleep(1,000,000)
        9) fork()
        a) getcwd()
        b) chdir()
        c) access(/proc/self/exe)
        d) sync()
        e) chmod()
        f) dup2()
        g) I/O Bound loop over /dev/mmcblk0
        q) quit this fine program
        
My raspberry pi seems to be running pretty smoothly with a text editor
and a few terminals. None of the four cores are working too hard - they
don't seem to peak above 30-40% while my program is not running.
        
%%%%%%%%%%%%%%
% FUNCTION 0 %
%%%%%%%%%%%%%%

## C++ arithmetic
When I run this command, it takes about 0.023-0.024 seconds on average. One
of the cores is completely at 100%, but it's all green. This is because
the arithmetic function doesn't need any special permissions or signals
(to use the kernel).
The process jumps between the mid 90s and mid 100s for CPU%

%%%%%%%%%%%%%%
% FUNCTION 1 %
%%%%%%%%%%%%%%

## Math Library()
This command performs much the same as the last one. It takes around 0.21
seconds on average. Again, one of the cores is all green and at 100%,
and the average CPU% is just over 100%.

%%%%%%%%%%%%%%
% FUNCTION 2 %
%%%%%%%%%%%%%%

## new/delete char[1]
This function is much slower than the previous ones. On average, it takes
about 0.33 seconds per million iterations. However, it is similar to the
previous functions because the CPU doesn't use the kernel and is at 100%. 
The average CPU% remains near 100%.

%%%%%%%%%%%%%%
% FUNCTION 3 %
%%%%%%%%%%%%%%

## new char[1]
The new char command crashes fairly quickly thanks to the ulimit -v
command. The function takes about 0.21 seconds on average and throttles
one of the CPUs up to 100%, and also includes a few calls to the kernel.
The CPU% is around 100%.

%%%%%%%%%%%%%%
% FUNCTION 4 %
%%%%%%%%%%%%%%

## kill(0)
The kill(0) command runs in about 0.44 seconds (well, I should say the
loop, which calls it a million times). The CPU% jumps up above 100% on
this one and the kernel is called much more than any other function
so far. It stays around 0.5-0.66 of the CPU that is working full time.

%%%%%%%%%%%%%%
% FUNCTION 5 %
%%%%%%%%%%%%%%

## kill(SIGUSR2)
This command takes much longer than kill(0), averaging around 3.7 seconds.
It throttles a CPU core and is almost entirely using the kernel 
(0.75-1.00). The CPU% stays close to 100%.

%%%%%%%%%%%%%%
% FUNCTION 6 %
%%%%%%%%%%%%%%

## nanosleep(1)
I changed this function along with the following two to loop 10,000 
times instead of one million. The nanosleep functions were really slow, 
so this made it more interesting. It takes about 0.6 seconds to run the 
loop. The CPU% stays around 10-25%, and no CPU core is throttled, but is 
some action going on in the kernel.

%%%%%%%%%%%%%%
% FUNCTION 7 %
%%%%%%%%%%%%%%

## nanosleep(1,000)
This function looks almost identical to nanosleep(1). It still uses the
kernel, but CPU% drops slightly. Interestingly, the loop takes almost
the exact same amount of time to run.

%%%%%%%%%%%%%%
% FUNCTION 8 %
%%%%%%%%%%%%%%

## nanosleep(1,000,000)
This function is much slower than the previous two. It takes over 10 
seconds to run. CPU% is also much much lower, usually staying at 0.0%
but occasionally jumping up to 6% or 8%. About the same proportion of
kernel use as the other nanosleep functions.

%%%%%%%%%%%%%%
% FUNCTION 9 %
%%%%%%%%%%%%%%

## fork()
Fork is another 'slow' function, running a little faster than 10 seconds
on average. It is focused on the kernel, but the CPU% stays around 
15-30%. This function is interesting because no particular CPU core is 
throttled, but at least three of the four seem to be running a decent
amount at a time and they jump around between cores much more than other 
functions.

%%%%%%%%%%%%%%
% FUNCTION a %
%%%%%%%%%%%%%%

## getcwd()
This function throttles a core, and primarily uses the kernel. CPU% is 
back to averaging around 100%. The average time (per million calls) is
about 1.1 seconds.

%%%%%%%%%%%%%%
% FUNCTION b %
%%%%%%%%%%%%%%

## chdir()
This one is very similar to the previous one with regards to the kernel
and throttling a single core. The loop runs in about 0.57 seconds, and
the kernel is using most of the core (~0.75). CPU% is near 100%.

%%%%%%%%%%%%%%
% FUNCTION c %
%%%%%%%%%%%%%%

## access(/proc/self/exe)
This command is much slower again (above 7 seconds). The CPU% is 
definitely above 100% and the throttled core is almost entirely kernel.

%%%%%%%%%%%%%%
% FUNCTION d %
%%%%%%%%%%%%%%

## sync()
Sync is another slow command, running in a little over 30 seconds. It is
similar to the access command, with a single core basically devoted to
the kernel. The CPU% is around 100%.

%%%%%%%%%%%%%%
% FUNCTION e %
%%%%%%%%%%%%%%

## chmod()
This command seems fast in comparison to sync(). chmod() runs through
the loopin about 1.7 seconds. The rest of the stats are very similar.
Another core throttled almost entirely by the kernel with the CPU%
jumping above 100%.

%%%%%%%%%%%%%%
% FUNCTION f %
%%%%%%%%%%%%%%

## dup2()
dup2() runs in about 0.48 seconds. The CPU% definitely averages above
100% (I'm assuming that the CPU% adds up to %400 - %100 per core). It
throttles a core with maybe 2/3 kernel.

%%%%%%%%%%%%%%
% FUNCTION g %
%%%%%%%%%%%%%%

## I/O bound loop over /dev/mmcblk0
Another slow command, coming at around 14 seconds. CPU% is around 100%
again, and the core is around 90% kernel.

%%%%%%%%%%%%%%
% FUNCTION q %
%%%%%%%%%%%%%%

## quit this fine program
Thankfully, this works well and the CPU cores return to their normal
behavior.
