---
title: "量化交易学习-week1"
description: "量化交易学习"
pubDate: "2025-10-23"
draft: false
---

## 学习 polars的`.groupby()`, `.rolling()`, `.resample()`

量化交易中最常见的是对于时间序列数据的处理
对于 polars 来说常见的 api 是 `group_by`, `rolling`, `groupby_dynamic`, `resample`

https://pola-rs.github.io/polars-book-cn/user-guide/dsl/groupby.html
https://pola-rs.github.io/polars-book-cn/user-guide/timeseries/intro.html

pandas 也是类似的逻辑，文档写的很详细我就不再重复了

来试试实践吧
baostock 提供了 5 分钟级别的数据

````python
---
title: "量化交易学习-week1"
description: "量化交易学习"
pubDate: "2025-10-23"
draft: false
---

## 学习 polars的`.groupby()`, `.rolling()`, `.resample()`

量化交易中最常见的是对于时间序列数据的处理
对于 polars 来说常见的 api 是 `group_by`, `rolling`, `groupby_dynamic`, `resample`

https://pola-rs.github.io/polars-book-cn/user-guide/dsl/groupby.html
https://pola-rs.github.io/polars-book-cn/user-guide/timeseries/intro.html

pandas 也是类似的逻辑，文档写的很详细我就不再重复了

来试试实践吧
baostock 提供了 5 分钟级别的数据

```python
import baostock as bs
import plotly.graph_objects as go
import polars as pl

lg = bs.login()

rs = bs.query_history_k_data_plus(
    "sh.600000",
    "date,time,code,open,high,low,close,volume,amount,adjustflag",
    start_date="2024-07-01",
    end_date="2024-12-31",
    frequency="5",
    adjustflag="3",
)
print("query_history_k_data_plus respond error_code:" + rs.error_code)
print("query_history_k_data_plus respond  error_msg:" + rs.error_msg)

data_list = []
while (rs.error_code == "0") & rs.next():
    # 获取一条记录，将记录合并在一起
    data_list.append(rs.get_row_data())
df = pl.DataFrame(data_list, schema=rs.fields, orient="row")


df = df.select(
    pl.col("date").str.to_date("%Y-%m-%d"),
    pl.col("time").str.to_datetime("%Y%m%d%H%M%S%3f"),
    pl.col("low").cast(pl.Float32),
    pl.col("high").cast(pl.Float32),
    pl.col("open").cast(pl.Float32),
    pl.col("close").cast(pl.Float32),
    pl.col("volume").cast(pl.Float32),
    pl.col("amount").cast(pl.Float32),
)

df = (
    df.group_by("date")
    .agg(
        pl.min("low"),
        pl.max("high"),
        pl.col("open").sort_by("time").first(),
        pl.col("close").sort_by("time").last(),
        pl.sum("volume"),
    )
    .sort("date")
)

df = df.with_columns(
    pl.col("close").rolling_mean(5).alias("MA5"),
    pl.col("close").rolling_mean(20).alias("MA20"),
)

fig = go.Figure()
fig.add_trace(
    go.Candlestick(
        x=df["date"],
        open=df["open"],
        high=df["high"],
        low=df["low"],
        close=df["close"],
        name="600000",
    )
)
fig.add_trace(
    go.Scatter(
        x=df["date"],
        y=df["MA5"],
        mode="lines",
        name="MA5",
        line=dict(width=1.2, color="orange"),
    )
)
fig.add_trace(
    go.Scatter(
        x=df["date"],
        y=df["MA20"],
        mode="lines",
        name="MA20",
        line=dict(width=1.2, color="blue"),
    )
)

fig.update_xaxes(type="category")
fig.show()

````

```

```
