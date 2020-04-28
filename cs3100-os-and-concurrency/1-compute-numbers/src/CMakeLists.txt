cmake_minimum_required (VERSION 3.0)
project(Assign2)

if (CMAKE_COMPILER_IS_GNUCXX)
    set(CMAKE_CXX_FLAGS "-std=c++14 -g3 -O0 ${CMAKE_CXX_FLAGS}")
endif()

add_executable(Assign2 main.cpp compute-pi.hpp compute-pi.cpp compute-e.hpp compute-e.cpp compute-fib.hpp compute-fib.cpp)