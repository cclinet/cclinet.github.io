---
title: "nanobind 使用说明1"
description: "nanobind 简介"
pubDate: "2024-08-08"
updatedDate: "2025-01-20"
draft: false
tags: ["nanobind", "python", "c++"]
---

这是 nanobind 的一个简单的介绍，想要详细了解 nanobind 最好的方式还是看[官方文档](https://nanobind.readthedocs.io/en/latest/index.html)。

## nanobind 介绍

nanobind 是一个用于将 C++和 Python 进行高效绑定的库。它主要用于在 Python 中调用 C++代码从而实现跨语言的高效互操作。它有以下特点：

- nanobind 非常轻量，只有一个头文件和一个库文件。设计上注重性能，通过紧凑的数据结构和代码生成来减少运行时开销。
- 支持自动类型转换，可以方便地在 Python 和 C++之间传递复杂的数据结构。提供了直观的 API，使得编写和维护绑定代码变得更加容易。
- 与流行的 pybind11 库兼容，可以方便地从 pybind11 迁移到 nanobind。
  ![sizes](https://nanobind.readthedocs.io/en/latest/_images/sizes.svg)
  ![performance](https://nanobind.readthedocs.io/en/latest/_images/perf.svg)
  可以看到在生成二进制大小和运行速度上，nanobind 都非常有竞争力。

## 开始使用 nanobind

要使用 nanobind，首先需要一个 c++的环境和 python 的环境，我这里以 Apple Clang 和 miniforge 创建的虚拟环境为例构建一个项目。

首先安装 nanobind，有几种方式，比较方便的是通过 pip 安装，这里把几种安装方式都列一下

```sh
#pip 安装
python -m pip install nanobind

#conda 安装
conda install -c conda-forge nanobind

# git submodule 安装
git submodule add https://github.com/wjakob/nanobind ext/nanobind
git submodule update --init --recursive
```

然后我们就可以配置 CMAKE 了,这里给一个例子
目录结构如下

- CMakeLists.txt
- cpp
  - cuckoo.cpp
- python
  - test.py

```cmake title="CMakeLists.txt"
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

```cpp title="cpp/cuckoo.cpp"
#include <nanobind/nanobind.h>

int add(int a, int b) { return a + b; }

// 注意这里的名字要和cmake中nanobind_add_module的名字相同
NB_MODULE(cuckoo, m) { m.def("add", &add); }
```

然后我们使用 cmake 编译

```shell
cmake -B build -DPython_ROOT_DIR=/opt/homebrew/Caskroom/miniforge/base/envs/nanobind
```

这样就会在 build 目录下生成一个类似于`cuckoo.cpython-312-darwin.so`这样名字的动态链接库。然后我们需要做的就是在 python 那边 import 这个库,我为了调试方便就建了一个软连接

```shell
cd python
ln -s ../build/cuckoo.cpython-312-darwin.so cuckoo.cpython-312-darwin.so
```

然后就可以正常运行 python 了

```python title="python/test.py"
import cuckoo

print(cuckoo.add(34, 1))
```

现在我们已经可以正常的运行一个最简单的 demo 了，接下来让我们使用 nanobind 来实现一些更高级的功能吧。

## 参数名和默认参数

从上一个例子中我们可以看到，我们生成的 add 函数的两个参数名已经变成了 `add(arg0: int, arg1: int, /) -> int`, 这是因为 C++ 语言在编译时并不会保留这些信息。为了让 python 能够实现函数参数名这个功能，我们需要在 bind 时手工指定参数名。

```cpp title="cpp/cuckoo.cpp"
#include <nanobind/nanobind.h>

namespace nb = nanobind;
using namespace nb::literals;
int add(int a, int b) { return a + b; }

NB_MODULE(cuckoo, m) {
  m.def(
      "add", &add, "a"_a, "b"_a = 1,
      "This function adds two numbers and increments if only one is provided.");
      m.attr("the_answer") = 42;
      m.doc() = "A simple example python extension";
}
```

除了添加参数名称和默认值，我们也添加了attr和doc两个字段。他们分别导出了值和文档。
重新编译以后，运行如下代码，会得到这样的结果

```python
import cuckoo

# help(cuckoo)
"""
Help on module cuckoo:

NAME
    cuckoo - A simple example python extension

DATA
    add = <nanobind.nb_func object>
        add(a: int, b: int = 1) -> int

        This function adds two numbers and increments if only one is provided.

    the_answer = 42

FILE
    ***/cuckoo.cpython-312-darwin.so
"""
print(cuckoo.add(a=40)) # 41
print(cuckoo.the_answer) # 42
```

## 自动生成typing文件
如果你正在使用像vscode这样的IDE, 你可能会发现IDE无法正确提示我们所写的代码，这是因为IDE无法识别.so文件的内容。幸运的是，nanobind提供了自动生成typing文件的功能。
我们只需要在CMakeLists中添加如下代码即可实现
```cpp title="CMakeLists.txt"
nanobind_add_stub(
  cuckoo_stub
  MODULE cuckoo
  OUTPUT cuckoo.pyi
  PYTHON_PATH $<TARGET_FILE_DIR:cuckoo>
  DEPENDS cuckoo
)
```
这样会在build 目录下生成cuckoo.pyi文件,同样软连接或者复制过来。

```shell
ln -s ../build/cuckoo.pyi cuckoo.cpython-312-darwin.so
```

[nanobind-2](/posts/nanobind/nanobind-2/)