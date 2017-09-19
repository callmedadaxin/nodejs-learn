const { fork } = require('child_process')

const p = fork('./child.js')

p.on('message', message => {
  console.log(`父进程接收到事件：${message}`)
})

p.send('hello world')