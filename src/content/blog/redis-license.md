---
title: "Redis许可证变更引发的开源盈利思考"
description: "探讨开源项目如何在当前环境中实现盈利"
pubDate: "2024-03-25"
updatedDate: "2024-03-26"
---

不久前，[Redis宣布从7.4版本开始，开源许可证将从 BSD 更换为 RSALv2 和 SSPLv1](https://Redis.com/blog/Redis-adopts-dual-source-available-licensing/)。这并非 Redis[^1] 首次更换许可证，早在2018年，Redis 就已经调整了其部分模块的许可证。此外，知名的开源项目MongoDB和ElasticSearch也曾经历过类似的许可证更换。

## 变化的影响

对于大多数开发者来说，这次许可证的更换并未带来明显的影响。我们仍然可以免费使用Redis，查看其源码，对于Redis的第三方库也没有任何变化。

然而，这次许可证的更换对云服务厂商产生了深远影响。在此之前，云服务厂商可以自由地提供Redis服务，甚至修改源码的Redis服务，这与Redis的商业模式形成了竞争。现在，云服务厂商必须购买Redis的商业许可证才能提供Redis服务。

显然，Redis的这次许可证更换，与之前 MongoDB 和 ElasticSearch 的做法一样，主要是针对云服务商。云服务商提供开源基础项目并收取附加费用，却不反馈给开源社区，这种行为在我看来就是在吸血。以AWS的Amazon ElastiCache为例，其价格几乎是同等配置的虚拟机的两倍[^2]。然而，这部分额外的收入，Redis并不能分到一分钱。更糟糕的是，AWS声称自己提供的服务比Redis更好，但并未将其优化的技术回馈给开源社区。因此，Redis选择更改许可证，直接针对云服务商，也就不足为奇了。

## 开源与免费

开源并不等于免费。开源意味着源代码是公开的，任何人都可以查看、修改和分发。然而，这并不意味着开源软件就必须是免费的。例如，Red Hat 就是一个以开源软件为基础，通过提供付费的支持和服务来盈利的公司。尽管 Red Hat 作为开源软件公司的标杆被反复提及，但它的日子也没那么好过，centOS作为RHEL的替代品，已经从一个稳定的操作系统变成了RHEL的试验场。同时RHEL的源代码也变成只向付费客户公开。

对于Redis这样的开源项目来说，找到一种可持续的盈利模式是非常重要的，然而开源软件的盈利一直都是一个难题，背靠大公司的开源软件可以不考虑赚钱的问题，但是其他的开源软件不提商业上的成功，大部分其实连维持自己正常运作的开销都不容易。目前开源软件的赚钱方式不外乎卖高阶功能，卖云，卖技术支持等几种途径。但是这几种盈利途径都在接受云服务商的挤压。我们迫切的需要一些更好的解决方案，让开源项目获得其应有的利润。

[^1]: 本文中的Redis有时候是指Redis这个开源产品，有时候指代 Redis Ltd. 这家公司。请读者根据上下文自行理解。
[^2]: 以AWS的Amazon ElastiCache为例，其中 cache.m7g.large 2 6.38 GiB 高达 12.5GB 的实例单价是 USD 0.158, 而同样配制的虚拟机（m7g.large 2 8GiB 仅限 EBS 高达 12500Mb）只需要 USD 0.0816