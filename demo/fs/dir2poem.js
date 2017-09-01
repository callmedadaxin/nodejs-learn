const fs = require('fs')
const path = require('path')

const bathPath = path.resolve(__dirname, './files')
const poemPath = path.join(bathPath, 'poem')

console.log(poemPath)

fs.readdir(poemPath, (err, files) => {
  let result = []
  files.forEach(fileName => {
    const fileIndex = parseInt(fileName.split('.')[0])
    const file = path.join(poemPath, fileName)
    const stat = fs.statSync(file)

    // 确定文件是一个文件二不是文件夹
    if (stat.isFile()) {
      result[fileIndex] = fs.readFileSync(file)
    }
  })

  result = result.join('')

  fs.writeFileSync(path.join(bathPath, 'poem1.txt'), result, 'utf8')
})