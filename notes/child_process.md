# child_process 子进程

child_process模块用于新建子进程。主进程可以读取子进程运行的结果。其结果缓存在系统缓存中（最大200kb）

## spwan

```
const { spawn } = require('child_process')
/**
 * @param name 可执行文件或命令
 * @param 参数数组
 */
const ls = spawn('ls', ['-lh', '/usr'])

ls.stdout.on('data', (data) => {
  console.log(`输出：${data}`)
})

ls.stderr.on('data', (data) => {
  console.log(`错误：${data}`)
})

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`)
})
```

默认情况下，在 Node.js 的父进程与衍生的子进程之间会建立 stdin、stdout 和 stderr 的管道。 数据能以非阻塞的方式在管道中流通。

同时，nodejs提供了几个方法用于简化创建子进程，都是在spawn方法上实现的。

## exec, execSync
衍生一个shell,并在shell上运行命令

exec方法有两种方法监听子进程

### 回调

```
const ls = exec('ls -l', (err, stdout, stderr) => {
  if (err) { console.log(err)}
  console.log(`out: ${stdout}`)
})
```

### 监听
其同样继承了eventemitter

```
const ls = exec('ls -l')

ls.stdout.on('data', data => {
  console.log(`out: ${data}`)
})
ls.on('close', code => {
  console.log('close')
})
```

### 同步执行
第二个参数为一系列命令，会阻塞事件循环

```
const output = execSync('ls -l', {
  cwd: cwd(),
  encoding: 'utf8'
})
console.log(output)
```

## execFile， execFileSync
直接执行特定的程序，参数作为数组传入，不会被bash解释，因此具有较高的安全性。
同时，他不会衍生一个shell,二回直接被衍生为一个新的进程，会比exec更高效。

其同样支持eventemitter和同步模式

```
execFile('/bin/ls', ['-l', './'], (err, result) => {
  console.log(result)
})
```

## fork
直接创建一个子进程，执行node脚本，同时在父子进程之间，创建一个通信管道

```
fork('./child.js')
// 相当于
spwan('node', ['./child.js'])
```

### send
可以用send来进行进程间通信

```
process.on('message', function(m) {
  console.log('CHILD got message:', m);
});

process.send({ foo: 'bar' });
```

## child_process 事件
child_process产生的实例，都继承EventEmitter，可以进行事件监听

- close
- disconnect
- error
- exit
- message

## child_process api
- disconnect 关闭通道
- kill 
- send