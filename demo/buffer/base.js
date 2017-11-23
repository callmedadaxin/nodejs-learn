// generate the buffer instances
const bytes = new Buffer(256)

// write contents
for (let i = 0; i < bytes.length; i++) {
  bytes[i] = i
}

console.log(bytes)

// copy
const more = new Buffer(4)
// target, targetStart, sourceStart, SourceEnd
bytes.copy(more, 0, 4, 8)

console.log(more)

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
