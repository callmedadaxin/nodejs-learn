# events
> 事件驱动模块，可以将很多异步事件拆成多个状态并进行监听，在实现该状态时触发监听。用于解决多状态的异步操作响应。

## 基础
Event Emmiter是一个接口，可以部署在任何对象上。

### 直接使用Event Emmiter进行事件监听
- event的触发和监听是同步的，先执行回调事件，才会执行后续的操作。
- this指向EventEmmiter实例

```
const Emmiter = require('events')
const emmiter = new Emmiter()

emmiter.on('event', () => {
  console.log('accept the event')
  console.log(this)
})

emmiter.on('event', function () {
  console.log(this)
  // EventEmitter {
  // domain: null,
  // _events: { event: [ [Function], [Function] ] },
  // _eventsCount: 1,
  // _maxListeners: undefined }
})

console.log('start')
// 先触发事件
emmiter.emit('event')
// 后执行后续代码
console.log('end')
```

### 将事件监听转为异步执行
使用setImmediate 或者process.nextTick进行切换

```
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('这个是异步发生的')
  })
})
```

### 让对象继承Event Emmiter接口
可以让任何对象继承EventEmmiter，来发布订阅消息。

```
// 让对象继承Event Emmiter接口
class Switch extends Emmiter {
  constructor (id) {
    super()
    this.id = id
    this.on('close', () => {
      console.log(`${this.id} has closed`)
    })
  }
}

const s = new Switch('switch1')
s.emit('close')
```

## 各种Api
### emit/on
on用于监听事件，emit用于触发事件，参考上面的简例

同名事件会按照事件添加的顺序依次调用

### once
只能触发一次事件，当事件被触发时，监听器会被注销

```
emmiter.once('event', (i) => {
  console.log(i)
})

emmiter.emit('event', 1) // => 1
emmiter.emit('event', 2) // 不触发
```

### removeListener(name, cb)/removeAllListeners([name])
移除事件监听

### setMaxListeners
设置最多可监听几个事件

### listeners(name)
返回事件所有的回调

## 默认事件
默认支持两个事件
- newListener 添加新回调时
- removeListener 移除回调时触发

```
emmiter.on('newListener', name => {
  console.log(`listen ${name}`)
})
emmiter.on('removeListener', name => {
  console.log(`remove ${name}`)
})

function test () {}

emmiter.on('test', test)
emmiter.removeListener('test', test)

// listen removeListener
// listen test
// remove test
```

## 错误处理
### 注册errer事件（推荐）
EventEmitter 实例中发生错误时，会触发一个 'error' 事件

```
emmiter.on('error', (err) => {
  console.error('有错误')
})
emmiter.emit('error', new Error('whoops!'))
```

### 为进程注册监听
注册uncaughtException的监听，防止进程崩溃
```
process.on('uncaughtException', (err) => {
  console.error('有错误')
})
```

## demo
参考 demo/events/base.js