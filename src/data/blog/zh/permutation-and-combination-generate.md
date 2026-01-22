---
title: "使用c++多线程高效生成排列和组合"
description: "在c++中利用tbb多线程高效生成排列和组合的代码"
pubDate: "2025-02-07"
draft: false
tags: ["C++"]
---

排列和组合就不过多介绍了，这里简单说一下算法。

## 组合计算

组合计算比较简单，这里用了一个简单的递归写法

```cpp
void process_combinations_range(std::vector<int> &combination, int pos, int start) {
    if (pos == k) {
      //do something
      return;
    }

    int end = n - (k - pos) + 1;
    for (int i = start; i < end; ++i) {
      combination[pos] = i;
      process_combinations_range(combination, pos + 1, i + 1);
    }
  };
```

## 排列

生成排列和组合其实是相似的事情。
对于从n中选出k的排列问题，我们可以把他转化成从n中选出k的组合，然后对每个组合进行全排列，这样就完成了n选k的排列。

```cpp
   if (pos == k) {
     do {
        //do something
        } while (std::next_permutation(combination.begin(), combination.end()));
      return;
    }
```

## 并行

上面这个算法是一个单线程的算法，我们把他改成并行。
我们对组合可以做如下处理，每个线程计算一个数字开头的组合

线程1：(1,2), (1,3), (1,4)

线程2：(2,3), (2,4)

线程3：(3,4)

为了高效的调度线程，我使用了TBB这个库自动分配任务。
对于每个线程的子任务，我们预先填充第一位数，并从第二位数开始执行上边的递归算法。

```cpp
  // 计算
  void process_from_start(int start) {
    std::vector<int> combination(k);
    combination[0] = start;
    process_combinations_range(combination, 1, start + 1);
  };

  // 分配任务
  void process_all() {
    tbb::parallel_for(0, n - k + 1, [this](int i) { process_from_start(i); });
  };
```

完整代码可见 https://github.com/cclinet/permutation

在8核M2芯片上，24选6的排列 大概率要2s
