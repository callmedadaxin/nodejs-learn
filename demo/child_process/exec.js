const { exec, execSync } = require('child_process')
const { cwd } = require('process')
// const ls = exec('ls -l', (err, stdout, stderr) => {
//   if (err) {
//     console.log(err)
//   }

//   console.log(`out: ${stdout}`)
// })

// const ls = exec('ls -l')

// ls.stdout.on('data', data => {
//   console.log(`out: ${data}`)
// })
// ls.on('close', code => {
//   console.log('close')
// })

const output = execSync('ls -l', {
  cwd: cwd(),
  encoding: 'utf8'
})
console.log(output)
