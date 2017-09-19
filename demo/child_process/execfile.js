const { execFile, execFileSync } = require('child_process')


// execFile('/bin/ls', ['-l', './'], (err, result) => {
//   console.log(result)
// })

// var ls = execFile('/bin/ls', ['-l'])

// ls.stdout.on('data', result => {
//   console.log(result)
// })

var result = execFileSync('/bin/ls', ['-l'], {
  encoding: 'utf8'
})
console.log(result)