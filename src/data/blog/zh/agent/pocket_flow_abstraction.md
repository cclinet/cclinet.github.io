---
title: "Pocket Flow: 核心抽象"
pubDate: "2025-11-20"
tags: ["LLM", "Agent"]
draft: true
description: "深入解析 Pocket Flow 如何仅用 100 行代码实现 LLM 框架的核心抽象：图 (Graph)。"
---

Pocket Flow 的核心在于其精简而强大的设计。仅用 [100行代码](https://github.com/The-Pocket/PocketFlow/blob/main/pocketflow/__init__.py)，它就捕捉到了大语言模型（LLM）框架的核心抽象：**图（Graph）**！

这种抽象使得开发者能够以图的形式构建和管理复杂的LLM应用逻辑，提供了极高的灵活性和可扩展性。
![核心抽象](https://github.com/The-Pocket/.github/raw/main/assets/abstraction.png)

我们一个一个图来看

## 1. Node

Node（节点）是agent最基础的组成部分
节点非常好理解，我们在设计 agent 过程中的每一个动作都是一个节点
比如读取一个图片
提取图片里的文字
对文字进行整理提取关键部分
这就是一个完整流程中的三个节点

## 2. Flow

Flow 也很简单，把几个 Node 穿起来，先执行一个 Node，再执行另一个 Node，就组成了一个 Flow

## 3. Shared

Shared 就是在 Node 中间共享信息
可以是第一个 Node 中提取的图片
也可以是提取是否成功的状态
总之就是需要两个 Node 共同知道的信息就是 Shared

## 4. Batch

Batch 也很简单，同时执行多个 Node 就是 Batch 了
比如一边烧水一边切菜

## 5. Async

Async 也好理解，像洗衣机，把衣服放里边就去做饭，等什么时候衣服洗好了，洗衣机滴滴滴叫你再回来晾衣服就是 Async

## 6.Branch

出门买两个馒头，如果看到苹果就买五个

## 7.Parallel

## 8.Looping

## 9.Nesting
