const fs = require('fs')
const path = require('path')

const bathPath = path.resolve(__dirname, './files')
const poemPath = path.join(bathPath, 'poem.txt')

fs.readFile(poemPath, 'utf8', (err, data) => {
  if (err) return
  const fileType = '.txt'
  const dirName = path.join(bathPath, 'poem')

  fs.stat(dirName, (err, stat) => {
    if (err) {
      fs.mkdirSync(dirName)
    }

    data.split('').forEach((txt, index) => {
      const fileName = `${index + 1}.${txt}${fileType}`
      const resultPath = path.join(bathPath, 'poem', fileName)
      fs.writeFileSync(resultPath, txt, 'utf8')
    })
  })
})