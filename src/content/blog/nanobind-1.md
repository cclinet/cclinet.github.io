---
title: "nanobind 使用说明1"
description: "nanobind 简介"
pubDate: "2024-08-08"
updatedDate: "2024-08-08"
draft: false
---

# nanobind 使用说明1

这是nanobind的一个简单的介绍，想要详细了解nanobind最好的方式还是看[官方文档](https://nanobind.readthedocs.io/en/latest/index.html)。

## nanobind 介绍

Nanobind 是一个用于将C++和Python进行高效绑定的库。它主要用于在Python中调用C++代码从而实现跨语言的高效互操作。它有以下特点：

- Nanobind非常轻量，只有一个头文件和一个库文件。设计上注重性能，通过紧凑的数据结构和代码生成来减少运行时开销。
- 支持自动类型转换，可以方便地在Python和C++之间传递复杂的数据结构。提供了直观的API，使得编写和维护绑定代码变得更加容易。
- 与流行的pybind11库兼容，可以方便地从pybind11迁移到nanobind。
  ![sizes](https://nanobind.readthedocs.io/en/latest/_images/sizes.svg)
  ![performance](https://nanobind.readthedocs.io/en/latest/_images/perf.svg)
  可以看到在生成二进制大小和运行速度上，nanobind都非常有竞争力。

## 开始使用nanobind

要使用nanobind，首先需要一个c++的环境和python的环境，我这里以 Apple Clang 和 miniforge 创建的虚拟环境为例构建一个项目。

首先安装nanobind，有几种方式，比较方便的是通过pip安装，这里把几种安装方式都列一下
```
#pip 安装
python -m pip install nanobind
#conda 安装
conda install -c conda-forge nanobind
# git submodule 安装
git submodule add https://github.com/wjakob/nanobind ext/nanobind
git submodule update --init --recursive
```

然后我们就可以配置CMAKE了,这里给一个例子
目录结构如下
- CMakeLists.txt
- cpp
  - cuckoo.cpp
- python
  - test.py
```CMAKE
cmake_minimum_required(VERSION 3.18)
project(cuckoo VERSION 0.1.0 LANGUAGES C CXX)

set(CMAKE_CPP_STANDARD 20)

# 通过-DPython_ROOT_DIR=${python虚拟环境目录} 指定包含nanobind（git submodule安装不需要）的Python环境，这里的编译环境和编译出来的库的使用环境可以不是同一个，但是需要版本相同。
find_package(Python 3 COMPONENTS Interpreter Development REQUIRED)

# pip或conda安装
execute_process(
  COMMAND "${Python_EXECUTABLE}" -m nanobind --cmake_dir
  OUTPUT_STRIP_TRAILING_WHITESPACE OUTPUT_VARIABLE nanobind_ROOT)
find_package(nanobind CONFIG REQUIRED)

#git submodule安装
# add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/ext/nanobind)

nanobind_add_module(cuckoo cpp/cuckoo.cpp)
```
下面则是一个简单的整数相加
```cpp
#include <nanobind/nanobind.h>

int add(int a, int b) { return a + b; }

// 注意这里的名字要和cmake中nanobind_add_module的名字相同
NB_MODULE(cuckoo, m) { m.def("add", &add); }
```

然后我们使用 cmake 编译
``` shell
cmake -B build -DPython_ROOT_DIR=/opt/homebrew/Caskroom/miniforge/base/envs/nanobind 
```
这样就会在build目录下生成一个类似于`cuckoo.cpython-312-darwin.so`这样名字的动态链接库。然后我们需要做的就是在python那边 import 这个库,我为了调试方便就建了一个软连接
```shell
cd python
ln -s ../build/cuckoo.cpython-312-darwin.so cuckoo.cpython-312-darwin.so
```
然后就可以正常运行python了
```python
import cuckoo

print(cuckoo.add(34, 1))
```
