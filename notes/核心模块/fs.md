# fs
> fileSystem 文件操作系统，可以对文件进行读写等操作，几乎所有的方法都包含异步和同步的形式。

在繁忙的进程中，建议使用异步的方法。 同步的方法会阻塞整个进程，直到完成（停止所有连接）。

## 异常处理
使用同步方法时，错误会被立即抛出，可以使用try/catch来进行处理。

异步方法，会将错误交给回调函数的第一个参数。

```
const fs = require('fs')
// 异步
fs.unlink('/tmp/hello', (err) => {
  if (err) {
    console.log('删除失败')
  }
  console.log('删除成功)
})

// 同步
try {
  fs.unlinkSync('/tmp/hello');
  console.log('删除成功!')
} catch (e) {
  console.log('删除失败')
}
```

## 各种Api

### 读操作 readFile/readFileSync

readFile

```
/**
 * @param path 绝对路径或者相对路径（相对于进程所在路径）
 */
fs.readFile(path, (err, buffer) => {
  // buffer Buffer实例
})
```
readFileSync

与异步方法不同的是，readFileSync可以对文件进行编码设置,若不传，则同样返回Buffer实例

```
// 什么都不传
var buffer = fs.readFileSync(path)
// 传入编码字符串
var text = fs.readFileSync(path, 'utf8')
// 传入配置对象
var text = fs.readFileSync(path, {
  encoding: 'utf8',
  flag: 'r' // 读取模式（只读）
})
```

### 写操作 writeFile/writeFileSync
二者的参数相同，异步操作多了一个回调事件

```
/**
 * @param name 文件名
 * @param msg 想写入的字符串
 * @param encoding 字符串编码 默认utf8
 * @param callback 回调函数
 */
fs.writeFile(name, msg, encoding, callback)
fs.writeFileSync(name, msg, encoding)
```

### exists/existsSync
判断文件是否存在

***注意：*** 不要在open方法之前调用exists方法，open方法本身就能检查文件是否存在。

```
/**
 * @param path 文件路径
 */
fs.exists(path, (exists) => {})
var exists = fs.existsSync(path)
```

### mkdir/mkdirSync
新建目录

```
/**
 * @param path 文件路径
 * @param mode 777 文件的权限
 * /
fs.mkdir(path, [mode], callback)
// @return undefined
fs.mkdirSync(path, [mode])
```

### readdir/readdirSync
读取目录，返回一个所包含的文件和子目录的数组。

```
fs.readdir(path, (err, files) => {
  if (err) return

  files.forEach(filename => {
    // 输出文件夹下的文件名
    console.log(filename)
  })
})
```

### stat/statSync
用于检测一个文件或者一个目录，返回文件的具体信息

主要用于判断处理的是文件还是目录

***注意：***不需要在读写操作前对文件使用stat检测，只要进行相应的错误处理即可

如果用于检验一个文件是否存在，建议使用fs.access

```
/**
 * @param path 文件|文件路径|URL
 */
fs.stat(path, stats => {})
const stats = fs.statSync(path)
```

stat方法
- stats.isFile()
- stats.isDirectory()
- stats.isBlockDevice()
- stats.isCharacterDevice()
- stats.isSymbolicLink() (仅对 fs.lstat() 有效)
- stats.isFIFO()
- stats.isSocket()

### createReadStream/createWriteStream
创建读写数据流，用于操作体积大的文件，读取操作的缓存装不下，只能分几次发送/写入

读数据流：

```
const input = fs.createReadStream(path)
let result = ''
// 读取文件时会分几次触发data事件
input.on('data', data => {
  result += data
})
// 读取文件结束时，触发end事件
input.on('end', () => {
  console.log(result)
})
```

写数据流：

```
var out = fs.createWriteStream(path, {
  encoding: 'utf8'
})
// 写数据
out.write(str)
// 结束
out.end()
```

### watchfile/unwatchfile
监听一个文件，当文件发生变化时，触发回调
就像我们在使用webpack-dev-server时的感觉一样，每次保存自动刷新浏览器

```
fs.watchFile(path, (curr, prev) => {
  // curr 当前file
  // prev 前一个file
})
```

## 实例
### 古诗
1. 找一首你喜欢的诗，并保存在poem.txt，后面的都使用程序来实现
2. 读取该文件
3. 创建一个poem文件夹
4. 将古诗里的文字，依次拆成一个文件，文件内容为该字的内容，并保存为该字.txt
5. 写一个反向读取poem文件夹内容，并生成poem.txt的过程

### 大文件copy
实现一个大文件copy方法，输入文件名称和输出路径，复制该文件
