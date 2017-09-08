# process
> 全局对象，用于提供进程相关信息，并控制进程

## 属性

### 基本属性
- argv 命令行参数
- env 当前Shell的环境变量,可对其进行修改
- pid 当前进程号
- platform 当前操作系统
- title 默认为node,可自定义
- version 当前node版本

见demo/process/base

### 其他属性
#### stdout/stdin
标准输出和标准输入

例子：
1. 记录用户输入并输出

```
let num1, num2

// 输出提示，相当于console.log
process.stdout.write('please input first num \n' )

// 监听用户输入
process.stdin.on('data', data => {
  if (!num1) {
    num1 = Number(data)
    process.stdout.write('please input second num \n')
  } else {
    num2 = Number(data)
    process.stdout.write(`the sum of two nums is ${num1 + num2} \n`)
    // 退出
    process.exit()
  }
})
```

2. stdin继承stream接口，所以可以使用stream接口方法（后续介绍）

```
process.stdin.setEncoding('utf8')

process.stdin.on('readable', function() {
  var chunk = process.stdin.read()
  if (chunk !== null) {
    process.stdout.write('data: ' + chunk)
  }
})

process.stdin.on('end', function() {
  process.stdout.write('end')
})
```

#### argv/execPath/execArgv
执行命令的参数/文件的绝对路径/命令行参数

```
$node --harmony base.js arg1 arg2 --version

<!-- [ '/usr/local/bin/node',
  '.../process/base.js',
  'arg1',
  'arg2',
  '--version' ]
/usr/local/bin/node
[ '--harmony' ] -->
```

## 各种API
### chdir/cwd
- chdir 切换工作路径，相当于cd
- cwd 返回当前进程绝对路径
- __dirname 返回当前文件的绝对路径
- getgid 获取进程组id
- getuid 获取进程用户id 

```
console.log(process.cwd()) //=> .../demo/process
process.chdir('../fs')  //=> .../demo/fs
console.log(process.cwd())
console.log(__dirname)  //=> .../demo/process
```

### exit
退出当前进程，参数0表示正常退出，大于1表示失败退出

同时，可以通过exitcode来制定退出状态

```
process.exitCode = 1
process.exit()
```

### nextTick
将任务放到当前一轮事件循环（Event Loop）的尾部

与setTimeout(fn, 0) 的区别

setTimeout将任务放到***下一轮事件循环***的头部，nextTick会比它先执行

nextTick的效率更高，不用检查是否到了时间

### on
也继承了EventEmitter接口，监听事件

支持事件：

- uncaughtException 捕获错误
- data 数据输出输入
- SIGINT 接收到系统信号SIGINT -> ctrl + c
- SIGTERM 接收到终止信号SIGTERM时触发
- exit 进程退出前触发

### kill 
关闭制定ID的进程，默认为SIGINT信号

```
process.kill(process.pid, 'SIGTERM');
```

## 进程退出码
进程退出时，会返回一个整数值代表退出时的状态

- 0 正常
- 1 发生未捕获的错误
- 5 v8执行错误
- 8 不正确参数
- 128 + 信号值