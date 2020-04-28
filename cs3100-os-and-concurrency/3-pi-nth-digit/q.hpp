#pragma once
#include <mutex>
#include <queue>


class q{
    private:
    
    std::queue<int> myq;
    std::mutex m;

    public:

    void push(int const& t){
        //only used for initializing, no need for lock_guard
        myq.push(t);
    }

    int pop(){
        std::lock_guard<std::mutex> g(m);
        if (myq.empty())
            return -1;
        int tmp = myq.front();
        myq.pop();
        return tmp;
    }

    bool empty(){
        std::lock_guard<std::mutex> g(m);
        if (myq.empty())
            return true;
        else
            return false;
    }
};