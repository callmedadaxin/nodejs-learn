# Buffer
> Node原生提供的全局对象，用于处理二进制数据的接口

## 基本使用
生成的数字是一个类似数组的对象，成员为0到255的数值

```
// generate the buffer instances
const bytes = new Buffer(256)

// write contents
for (let i = 0; i < bytes.length; i++) {
  bytes[i] = i
}
```

### copy
// target, targetStart, sourceStart, SourceEnd
bytes.copy(more, 0, 4, 8)
将more的内容从bytes中的4-8copy进去

## 与二进制数组的关系
> TypedArray构造函数可以接受Buffer实例作为参数，生成一个二进制数组。比如，new Uint32Array(new Buffer([1, 2, 3, 4]))，生成一个4个成员的二进制数组。注意，新数组的成员有四个，而不是只有单个成员（[0x1020304]或者[0x4030201]）。另外，这时二进制数组所对应的内存是从Buffer对象拷贝的，而不是共享的。二进制数组的buffer属性，保留指向原Buffer对象的指针。
二进制数组的操作，与Buffer对象的操作基本上是兼容的，只有轻微的差异。比如，二进制数组的slice方法返回原内存的拷贝，而Buffer对象的slice方法创造原内存的一个视图（view）

## 构造函数
构造函数有不同的参数
```
// an empty buffer which length is 5
const empty = new Buffer(5)

// with array params, whose member should be number
const hello = new Buffer([0x48, 0x65, 0x6c, 0x6c, 0x6f])
console.log(hello.toString())

// with string params
const str = new Buffer('Hello')
str.length
str.toString()

// with buffer instance, same as copy
const strCopy = new Buffer(str)
```

## 方法
### isEncoding
表示实例是否为指定编码

```
Buffer.isEncoding('utf8')
```

### isBuffer
是否为Buffer实例

### byteLength
字节长度

### concat
合并

## 实例方法
### write(content, positing, encoding)
写入数据

### slice
### toString
### toJSON
