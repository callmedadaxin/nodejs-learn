const fs = require('fs')
const path = require('path')

function resolve (p) {
  return path.resolve(process.cwd(), p)
}

function copyFile (path, target) {
  const input = fs.createReadStream(resolve(path))
  const output = fs.createWriteStream(resolve(target), {
    encoding: 'utf8'
  })

  input.on('data', data => {
    output.write(data)
  })
  input.on('end', () => {
    output.end()
    console.log('copy success')
  })
}

const filePath = process.argv[2]
const targetPath = process.argv[3]

if (!filePath) {
  return console.log('please input the file path!')
}
if (!targetPath) {
  return console.log('please input the target path')
}

copyFile(filePath, targetPath)