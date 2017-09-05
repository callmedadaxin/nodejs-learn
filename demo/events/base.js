const Emmiter = require('events')
const emmiter = new Emmiter()

// 基础使用
emmiter.on('event', () => {
  console.log('accept the event')
})

// this指向EventEmitter
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

// 默认事件
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

// 错误处理
emmiter.on('error', (err) => {
  console.error('有错误')
})
emmiter.emit('error', new Error('whoops!'))
