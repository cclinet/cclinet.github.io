---
title: "大模型中的Packed Sequences"
description: "大模型中的Packed Sequences"
pubDate: "2024-12-26"
draft: true
---

训练大型语言模型（LLMs）是一项计算密集型任务。它需要大量的数据、强大的硬件和巧妙的优化技术。有一种技术并不常被提及，那就是使用打包序列来充分利用每个训练步骤中选择的上下文长度。
想象一下，给一个Transformer模型输入一批不同长度的文本序列。为了保持一致的输入维度，较短的序列会用特殊标记进行填充。虽然这看起来无害，但它浪费了宝贵的GPU内存，因为模型会关注无意义的填充标记。

解决方案：序列打包
打包序列提供了一个优雅的解决方案。我们不是进行填充，而是将多个较短的序列连接成一个更长的单一序列。这最小化了计算浪费（通过填充标记）。它还允许我们每个批次处理更多的标记，从而减少训练时间。然而，有一个问题：我们需要确保模型不会跨越序列边界进行关注。让我们来看一个简单的例子。我们将以下三个句子打包成一个单一序列，用EOS标记分隔。

```python title=python
# Setup
import torch; torch.set_printoptions(linewidth=200)
from transformers import AutoTokenizer, AutoConfig, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("gpt2")
config = AutoConfig.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_config(config)
```

```python title=python
sentence1 = "猫坐在垫子上"
sentence2 = "狗吃了我的作业"
sentence3 = "我的姑姑是一名教师"
sentences = [sentence1, sentence2, sentence3]
tokenized_sentences = tokenizer(sentences, return_attention_mask=False, add_special_tokens=False)["input_ids"]
tokenized_sentences = [t for s in tokenized_sentences for t in s + [tokenizer.eos_token_id]]
tokenizer.decode(tokenized_sentences)
```

如果我们再次解码打包的序列，它将看起来像这样：

猫坐在垫子上<|endoftext|>狗吃了我的作业<|endoftext|>我的姑姑是一名教师<|endoftext|>

标准的原因语言建模的注意力掩码对于打包序列将如下所示。

```python
tokenized_sentences = torch.tensor(tokenized_sentences)
attn_mask = torch.ones(tokenized_sentences.size(0), tokenized_sentences.size(0), dtype=torch.int).tril()
attn_mask
```

然而，使用这个掩码，在处理第二个句子时，模型仍然可以关注到第一个句子中的标记，这是不理想的，因为两个例子是独立的。为了解决这个问题，我们可以以某种方式截断注意力掩码。当批次中只有一个样本时，在PyTorch中这样做相对容易。
