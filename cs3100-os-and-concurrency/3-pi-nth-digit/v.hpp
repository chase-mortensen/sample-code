#pragma once
#include <mutex>
#include <queue>


class v{
    private:
    
    std::vector<int> myv;
    std::mutex m;

    public:

    void insert(int i, int t){
        std::lock_guard<std::mutex> g(m);
        myv[i] = t;
    }

    int at(int i){
        std::lock_guard<std::mutex> g(m);
        return myv.at(i);
    }

    void push(int const& t){
        //only used for initializing, no need for lock_guard
        myv.push_back(t);
    }
};