---
title: "Efficient Generation of Permutations and Combinations Using C++ Multithreading"
description: "C++ code for efficiently generating permutations and combinations using TBB multithreading."
pubDate: "2025-02-07"
draft: false
tags: ["c++"]
---

Permutations and combinations are well-known topics, so I won’t go into too much detail here. I’ll just briefly explain the algorithm.

## Combination Calculation

Combination calculation is relatively simple, and here I use a basic recursive approach.

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

## Permutations

Generating permutations and combinations is actually quite similar.
For the problem of selecting k elements from n to form a permutation, we can transform it into a combination problem (select k elements from n), then generate all permutations for each combination. This will complete the n choose k permutation generation.

```cpp
   if (pos == k) {
     do {
        //do something
        } while (std::next_permutation(combination.begin(), combination.end()));
      return;
    }
```

## Parallelization

The algorithm above is a single-threaded algorithm. Let's modify it to use parallelism.
We can handle combinations as follows, where each thread calculates combinations starting with a specific number.

Thread 1：(1,2), (1,3), (1,4)

Thread 2：(2,3), (2,4)

Thread 3：(3,4)

To efficiently schedule threads, I used the TBB library to automatically distribute tasks.
For each sub-task of a thread, we pre-fill the first number and then begin executing the recursive algorithm from the second number.

```cpp
  // Calculation
  void process_from_start(int start) {
    std::vector<int> combination(k);
    combination[0] = start;
    process_combinations_range(combination, 1, start + 1);
  };

  // Task allocation
  void process_all() {
    tbb::parallel_for(0, n - k + 1, [this](int i) { process_from_start(i); });
  };
```

You can find the full code at: https://github.com/cclinet/permutation

On an 8-core M2 chip, the permutation of 24 choose 6 will likely take around 2 seconds.
