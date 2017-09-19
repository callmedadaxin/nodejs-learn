process.on('message', message => {
  console.log(`子进程接收到事件：${message}`)
})

process.send('hello parent')