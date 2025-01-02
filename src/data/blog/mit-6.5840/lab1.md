---
title: "mit-6.5840(6.824) lab1"
description: "mit-6.5840 lab1"
pubDate: "2024-10-30"
updatedDate: "2024-10-30"
draft: false
tags: ["go", "distributed systems"]
---

## 思路

map和reduce都是无状态的纯函数，所以wowker也不应该涉及任何状态的保存

所以map只有需要操作两件事情

1. 申请任务
2. 报告任务

分开看，申请任务不需要区分申请map或者reduce，所以只要在worker中一直申请就好，任务一旦完成，就立即报告任务完成

```go title="worker.go"
func Worker(mapf func(string, string) []KeyValue,
	reducef func(string, []string) string) {
out:
	for {
		res := RequestNewTaskFunc()
		switch res.Type {
		case Map:
			HandleMap(mapf, res.Map.FileName, res.Map.ReduceTaskNum, res.Map.TaskID)
			ReportTaskCompleteFunc(Map, res.Map.TaskID)
		case Reduce:
			HandleReduce(reducef, res.Reduce.TaskID, res.Reduce.MapTaskNum)
			ReportTaskCompleteFunc(Reduce, res.Reduce.TaskID)
		case Continue:
			continue out
		case Stop:
			break out
		}
	}
}
```

对于coordinator，利用channel的机制来避免外部的锁
channel 和其他语言的管道应该是一样的东西，理解起来还是挺简单的

```go
type Coordinator struct {
	// Your definitions here.
	mapTask                []MapTask
	reduceTask             []ReduceTask
	mapChan                chan int //需要执行的map任务taskID
	reduceChan             chan int//需要执行的reduce任务taskID
	mapTaskNum             int
	reduceTaskNum          int
	completedMapTaskNum    int
	completedReduceTaskNum int
	reportChan             chan ReportTaskCompleteArgs
}
```

使用了两个channel分别保存了需要执行的map任务和reduce任务
使用reportChan来处理时间完成的状态修改，来避免多个worker上报同一个任务时状态不对的问题

```go
func MakeCoordinator(files []string, nReduce int) *Coordinator {
	c := Coordinator{}

	// 初始化reduce任务
	c.completedReduceTaskNum = 0
	c.reduceChan = make(chan int, nReduce)
	for i := range nReduce {
		c.reduceTask = append(c.reduceTask, ReduceTask{partition: i, completed: false})
		c.reduceChan <- i
	}

	// 初始化map任务
	c.completedMapTaskNum = 0
	c.mapChan = make(chan int, len(files))
	for i, file := range files {
		c.mapTask = append(c.mapTask, MapTask{filename: file, completed: false})
		c.mapChan <- i
	}

	c.reportChan = make(chan ReportTaskCompleteArgs)

	//处理汇报事件
	go func() {
		for {
			task := <-c.reportChan
			// log.Printf("%v", task)
			taskID := task.TaskID
			switch task.TaskType {
			case Map:
				if !c.mapTask[taskID].completed {
					c.mapTask[taskID].completed = true
					c.completedMapTaskNum += 1
				}

			case Reduce:
				if !c.reduceTask[taskID].completed {
					c.reduceTask[taskID].completed = true
					c.completedReduceTaskNum += 1
				}
			}
		}
	}()
	c.server()
	return &c
}
```

根据已经完成的任务数量来判断当前阶段，只有当map全部完成时才进入reduce，如果map没有完成，有worker请求任务，则让其等待

```go
func (c *Coordinator) Call(req *RequestArgs, res *RPCResponseArgs) error {
	// log.Printf("%v", req)
	switch req.Type {
	case RequestNewTask:
		if c.completedReduceTaskNum == len(c.reduceTask) {
			res.Type = Stop
			return nil
		}
		if c.completedMapTaskNum == len(c.mapTask) {
			select {
			case taskID := <-c.reduceChan:
				res.Type = Reduce
				res.Reduce = ReduceArgs{TaskID: taskID, MapTaskNum: len(c.mapTask)}
				go func() {
					time.AfterFunc(10*time.Second, func() {
						if !c.reduceTask[taskID].completed {
							c.reduceChan <- taskID
						}
					})
				}()
			default:
				res.Type = Continue
			}

			return nil
		}

		select {
		case taskID := <-c.mapChan:
			res.Type = Map
			res.Map = MapArgs{TaskID: taskID, FileName: c.mapTask[taskID].filename, ReduceTaskNum: len(c.reduceTask)}
			go func() {
				time.AfterFunc(10*time.Second, func() {
					if !c.mapTask[taskID].completed {
						c.mapChan <- taskID
					}
				})
			}()
		default:
			res.Type = Continue
		}
		return nil
	case ReportTaskComplete:
		c.reportChan <- req.ReportTaskCompleteArgs
		res.Type = OK
	}

	return nil
}
```
