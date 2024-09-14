---
title: PAI-Rec 中的流量调控算法
description: "PAI-Rec 中的流量调控算法"
pubDate: "2024-09-13"
updatedDate: "2024-09-13"
draft: false
---

## 什么是 PID

$$
u(t) = K_pe(t) + K_i\int_0^te(\tau)d\tau + K_d\frac{d}{d(t)}e(t)
$$

假设 $\Delta t$ 为采样周期，k 为采样序号 离散化可以得到

$$
\int_0^{t_k}e(\tau)d\tau = \sum_{i=1}^ke(t_i)\Delta t
$$

$$
\frac{d}{d(t)}e(t)=\frac{e(t_k)-e(t_{k-1})}{\Delta t}
$$

得到

$$
\begin{aligned}
u(k)&=K_pe(k) +K_i\sum_{i=0}^ke(t_i)\Delta t +  K_d\frac{(e(k)-e(k-1))}{\Delta t} \\
&= K_pe(k) + K_i\sum_{i=0}^ke(t_i)+K_d(e(k)-e(k-1))
\end {aligned}
$$

## 调控公式

这里并没有使用传统的加权方式，而是直接调整排序策略

假设展示位置调整量为$\Delta rank$,那么

$$
new\_rank = model\_rank - \Delta rank
$$

然后按照 new_rank 进行排序
其中$\Delta rank$的计算公式如下

$$
\Delta rank(t,i)=
\begin{cases}
 & \alpha_t \cdot(1+\gamma tanh (\beta w_t))\cdot e^{score_i/max\_score}  &  {\alpha_t>0}\\
 & \alpha_t \cdot(1/(1+e^{10-r_i \eta \cdot (1-tanh (w_t))}))  &    {\alpha_t<0}
\end{cases}
$$

这里 t 对应一个调控目标，i 对应一个 item，$score_i$ 是 item i 的模型得分，max_score 是得分最高的 item 的模型分
$r_i$是按照模型分降序排列得到的 rank 位置；
$\alpha_t$的 PID 算法输出的调控信号；
$w_t$是调控目标 t 的权重，反应当前用户对当前调控目标商品集合的总体偏好程度，计算公式为

$$
w_t = \frac{\sum_{i\in t} score_i \cdot e^{-0.01r}}
{\sum_{i} score_i \cdot e^{-0.01r}}
$$

最终的调控位置偏移值的计算：

$$
\Delta final\_rank(i) = \sum_t \Delta rank(t,i)
$$
