# http

Node的HTTP是非常底层的，只涉及流处理与消息解析

接收到的原始消息头保存在 rawHeaders 属性中，例如：

```
[ 'ConTent-Length', '123456',
  'content-LENGTH', '123',
  'content-type', 'text/plain',
  'CONNECTION', 'keep-alive',
  'Host', 'mysite.com',
  'accepT', '*/*' ]
```

### http.STATUS_CODES
返回标准的HTTP想要状态码的集合

### 基本用法
下面我们来使用http模块简历一个简单的HTTP服务

```
const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.write('hello world')
  res.end()
}).listen(8080)
```