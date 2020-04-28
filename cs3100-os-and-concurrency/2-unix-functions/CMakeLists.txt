cmake_minimum_required (VERSION 3.0)
project(Assign3)

if (CMAKE_COMPILER_IS_GNUCXX)
    set(CMAKE_CXX_FLAGS "-std=c++14 -O0 -g3 -Wall -Wextra ${CMAKE_CXX_FLAGS}")
endif()

add_executable(Assign3 main.cpp c++lang.hpp c++lang.cpp filesystem.hpp filesystem.cpp io.hpp io.cpp process.hpp process.cpp)
