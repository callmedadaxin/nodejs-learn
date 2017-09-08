// ------- cwd/chdir --------
console.log(process.cwd())
process.chdir('..')
console.log(process.cwd())
console.log(__dirname)

console.log(process.getgid())
console.log(process.getuid())


// -------- nextTick -------- 
setTimeout(() => {
  console.log('settimeout')
}, 0)
process.nextTick(() => {
  console.log('nextTick')
})

// -------- error -----------
process.on('uncaughtException', e => {
  console.log(e.message)
  process.exit(1)
})

throw new Error('fail')