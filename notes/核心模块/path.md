# path
> 用于处理文件与目录的路径的一系列工具函数，仅介绍并记录一些常用的api, 其他可参考文档

## path.join
用于拼接路径，使用***当前系统***的路径分隔符，如'/'或者'\'

## path.resolve
返回绝对路径，接收多个参数，表示依次进入的路径

```
path.resolve('foo/bar', '/tmp/file/', '..')

// 等同于
$ cd foo.bar
$ cd /tmp/file/
$ cd ..
$ pwd
```

## path.relative
返回两个***绝对路径***的相对路径

若两个参数相同，则返回空字符串

## path.normalize
将传入的路径转为标准路径，做了两件事儿：
- 解析.和..
- 去掉躲雨的斜杠

## path.parse
返回一个对象，表示path元素，包括：

- dir 目录
- root 根
- base 文件
- name 文件名
- ext 文件后缀
