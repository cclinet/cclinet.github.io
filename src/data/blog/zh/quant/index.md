---
title: "量化交易学习-清单"
description: "量化交易学习"
pubDate: "2025-10-22"
draft: false
---

[week1](/posts/quant/week1/)

## 🗓️ 第 1 周：熟悉金融时间序列 & 数据处理

### 🎯 目标

掌握行情数据的读取、清洗、聚合与可视化。

### 📘 学习重点

pandas / polars 的时间序列操作

.groupby(), .rolling(), .resample()

datetime 处理、索引操作

可视化（matplotlib / plotly）

### 🧩 实践任务

读取股票分钟线数据（如 CSV）

计算 MA5、MA20，并画出 K 线 + 均线

按日期聚合统计每日收益率

### 🧾 输出成果

plot.png：显示一段时间内的价格 + MA5/MA20
notebook: 完整数据清洗 + 可视化脚本

## 🗓️ 第 2 周：实现基础回测框架（单标的）

### 🎯 目标

能够运行一个简单策略（如双均线）并输出资金曲线。

### 📘 学习重点

策略信号：上穿/下穿判定

回测循环：买入/卖出逻辑

仓位管理、手续费

资金曲线计算

### 🧩 实践任务

实现“MA5 上穿 MA20 买入，下穿卖出”

记录每次交易（时间、价格、持仓）

输出资金曲线

### 🧾 输出成果

backtest.py: 一个能运行的回测脚本

equity_curve.png: 净值曲线

控制台输出：总收益、最大回撤、年化收益

## 🗓️ 第 3 周：多标的与选股策略

### 🎯 目标

扩展到多股票的回测框架。

###📘 学习重点

groupby 按股票处理

rank 选股逻辑

每周期调仓（如每周选 top N 股票）

合并多标的净值曲线

### 🧩 实践任务

每周对所有股票打分（例如过去 5 日收益）

选 top 5 买入，等权配置

计算组合净值曲线

### 🧾 输出成果

portfolio_backtest.py

portfolio_equity_curve.png

输出组合收益率、夏普、最大回撤

## 🗓️ 第 4 周：性能与指标计算

### 🎯 目标

写出专业级绩效分析模块。

### 📘 学习重点

年化收益、最大回撤、夏普比率、Calmar 等

净值序列平滑与风险指标

Polars / Numpy 向量化优化

### 🧩 实践任务

实现指标计算函数：

def annual_return(equity): ...
def sharpe_ratio(equity): ...
def max_drawdown(equity): ...

对策略输出做完整分析报告

绘制净值曲线 + 回撤曲线

### 🧾 输出成果

performance.py 模块

一份 performance_report.md，展示指标与图表

## 🗓️ 第 5～6 周：逐笔数据与 orderbook 复原

### 🎯 目标

理解撮合机制，能从挂单/撤单/成交数据重构盘口。

### 📘 学习重点

orderbook 结构（bid/ask 队列）

price-time 优先撮合原则

逐笔消息流事件处理

数据结构设计（用 SortedDict 管理档位）

### 🧩 实践任务

写一个简化版盘口维护类：

class OrderBook:
def add_order(self, order): ...
def cancel_order(self, order_id): ...
def match_trade(self, trade): ...

从事件流（逐笔数据）恢复盘口快照

输出某个时间段内前 5 档盘口

### 🧾 输出成果

orderbook_sim.py

snapshot.png: 展示盘口深度随时间的变化

如果你有真实逐笔数据，可验证准确性

## 🧠 额外强化方向（可选）

| 主题         | 内容                                          |
| ------------ | --------------------------------------------- |
| 回测框架进阶 | 支持滑点、持仓限制、交易成本                  |
| 数据库优化   | 用 Parquet / Polars 处理亿级数据              |
| 可视化       | 用 Plotly 绘制交互式收益曲线                  |
| 量化工具     | 了解 vectorbt、backtrader 的设计思想          |
| 研究能力     | 复现经典论文策略，如 momentum, value, low-vol |

## 🧭 总结

| 阶段      | 难度         | 输出成果        | 关键词    |
| --------- | ------------ | --------------- | --------- |
| 第 1 周   | ⭐️          | 数据清洗+可视化 | 时间序列  |
| 第 2 周   | ⭐️⭐️       | 单标策略回测    | 双均线    |
| 第 3 周   | ⭐️⭐️⭐️    | 多标组合策略    | 排名选股  |
| 第 4 周   | ⭐️⭐️       | 指标计算模块    | 夏普/回撤 |
| 第 5-6 周 | ⭐️⭐️⭐️⭐️ | 盘口重建        | OrderBook |
