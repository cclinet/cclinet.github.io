---
title: "为什么 attention 需要除以sqrt(d)"
description: "为什么 attention 需要除以sqrt(d)"
pubDate: "2025-01-07"
draft: false
tags: ["deep learning", "LLM"]
---

attention is all you need 的论文中，计算attention的公式如下

$$
Attention(Q,K,V) = softmax(\frac{QK^T}{\sqrt{d^k}})V
$$

那么除以$\sqrt{d}$的原因是什么呢？其实很简单，就是为了数值的稳定性。

深度学习会有一些假设，这里可以认为在初始状态下，Q 和 K 独立，且服从标准正态分布。
为了保证数值的稳定性，我们会希望输出依然服从标准正态分布，这样有利于 softmax 和下一层的计算稳定。

那就我们从方差角度推导，如何让 $QK_T$ 的输出也服从标准正态分布。
首先

$$
Q \sim N(0,1)
K \sim N(0,1)
$$

那么

$$
\begin{aligned}
Var(QK^T)  &= Var(\sum_1^dQ_iK_i^T) \\
           &=\sum_1^dVar(Q_iK_i^T)
\end{aligned}
$$

以一组 $Var(Q_1K_1^T)$ 为例计算，记住这里 QK 相互独立

$$
Var(Q_1K_1^T) = Var(Q_1)Var(K_1^T) = 1
$$

那么

$$
Var(QK^T) = \sum_i^d1 = d
$$

所以这里对 $QK^T$ 的结果除以 $\sqrt{d}$ 即可服从标准正态分布。
