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


