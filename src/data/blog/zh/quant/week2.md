---
title: "量化交易学习-week2"
description: "量化交易学习"
pubDate: "2025-10-23"
updatedDate: "2025-11-11"
draft: false
---

第二周也比较简单，特别需要注意最大回撤遇到的穿越问题

```python
import plotly.express as px
import plotly.graph_objects as go
import polars as pl

df = pl.read_parquet("1.parquet")
status = []
money = 100_000
volumns = 0
total = money
is_holding = False

for each_line in df.iter_rows():
    action = None
    date, *_, close, _, MA5, MA20 = each_line
    if MA20 is None or MA5 is None:
        continue
    if MA5 > MA20 and not is_holding:
        is_holding = True
        action = "Buy"
        volumns = money // (close * 100) * 100
        money = money - volumns * close

    elif MA5 < MA20 and is_holding:
        is_holding = False
        action = "Sell"
        money = money + volumns * close
        volumns = 0

    total = money + volumns * close
    status.append(
        {
            "date": date,
            "volumns": volumns,
            "money": money,
            "total": total,
            "action": action,
        }
    )

status_df = pl.DataFrame(status).sort(by="date")

initial_total = status_df["total"][0]
final_total = status_df["total"][-1]
total_return = (final_total / initial_total) - 1
status_df = status_df.with_columns(pl.col("total").cum_max().alias("peak"))
status_df = status_df.with_columns(
    ((pl.col("total") - pl.col("peak")) / pl.col("peak")).alias("drawdown_pct")
)
max_drawdown = status_df["drawdown_pct"].min()
total_days = len(status_df)
TRADING_DAYS_PER_YEAR = 252
annualized_return = (1 + total_return) ** (TRADING_DAYS_PER_YEAR / total_days) - 1

print("\n=== 回测结果 ===")
print(f"初始资金: {initial_total:,.2f}")
print(f"最终资金: {final_total:,.2f}")
print(f"总收益率: {total_return:.2%}")
print(f"最大回测: {max_drawdown:.2%}")
print(f"年化收益: {annualized_return:.2%}")

fig = px.line(status_df, x="date", y="total")
fig.show()
```
