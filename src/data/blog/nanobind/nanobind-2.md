---
title: "nanobind 使用说明2"
description: "nanobind 简介"
pubDate: "2024-08-027"
updatedDate: "2024-08-027"
draft: false
---

现在我们已经可以正常的运行一个最简单的 demo 了，接下来让我们使用 nanobind 来实现一些更高级的功能吧。

## 参数名和默认参数

从上一个例子中我们可以看到，我们生成的 add 函数的两个参数名已经变成了 `add(arg0: int, arg1: int, /) -> int`, 这是因为 C++ 语言在编译时并不会保留这些信息。为了让 python 能够实现函数参数名这个功能，我们需要在 bind 时手工指定参数名。

```cpp title="cpp/CMakeLists.txt"
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
``
```
