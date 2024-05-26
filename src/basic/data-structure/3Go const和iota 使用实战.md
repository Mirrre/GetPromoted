**const 用于定义常量，定义之后不能修改，不能再次赋值，在程序运行期间不会改变。**

# 定义一个常量

```go
const pi = 3.1415926
```

# 批量声明常量

```go
const (
   statusOk = 200
   notFound = 404
   serverError = 500
)
```

# 批量声明常量时，如果某一行没有写=，那么就和上一行一致

```go
const (
   n1 = 100
   n2
   n3
)
```

打印结果：n1 n2 n3 都是100

# iota

1. 在const关键字出现时将被重置为0；
2. const中每增加一行常量声明，将使 iota 计数一次
3. 我iota的理解就是类似枚举

```go
const (
   a1 = iota //0
   a2
   a3
)
```

打印结果：a1:0 a2:1 a3:2

## iota面试题1

```go
const (
   b1 = iota //0
   b2        //1
   _         //2
   b3        //3
)
```

**分析：_也占了一行，所以_的值相当于是2，打印b3的值为3**

## iota面试题2：插队情况(1)

```go
const (
   c1 = iota //0
   c2 = 100  //100
   c3        //100
   c4        //100
)
```

**分析：c1=iota，所以c1的值为0很好理解；因为c2=100，而c3、c4没有=，所以和c2的值保持一致都是100**

## iota面试题3：插队情况(2)

```go
const (
   d1 = iota //0
   d2 = 100  //100
   d3 = iota //2
   d4        //3
)
```

**分析：d3的值为2可能出乎有些同学的意料，有的同学可能觉得d3的值为0，其实不是的。这道题其实就是为了让d3继续使用iota的方式设置值。 或者这么讲：在面试题2中怎么设置让c3不为100，而是继续按照iota赋值，让c3=2呢？面试题3就给出了答案。**

## 多个常量声明在一行

```go
const (
   d1, d2 = iota + 1, iota + 2 //1 2
   d3, d4 = iota + 1, iota + 2 //2 3
)
```

**分析：其实很好理解，第一行的iota值为0，第二行的iota值为1，再执行加法运算就是注释中标注的结果了**

# iota应用实例

定义数量级

```go
const (
   _  = iota
   KB = 1 << (10 * iota)
   MB = 1 << (10 * iota)
   GB = 1 << (10 * iota)
   TB = 1 << (10 * iota)
   PB = 1 << (10 * iota)
)
```

输出结果

```go
KB: 1024
MB: 1048576
GB: 1073741824
TB: 1099511627776
PB: 1125899906842624
```

## 更进一步

猜一下下面代码段的输出结果是什么？

```go
const (
   _  = iota
   KB = 1 << (10 * iota)
   MB
   GB
   TB
   PB
)
```

打印结果和上面是一样的：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/08f340a4fef847949e36c1c2997fae35tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

# 总结

定义常量使用const关键字，定义之后不能修改，不能再次赋值，在程序运行期间不会改变。

iota是go语言中很特殊的设定，我在PHP中还没用过类似的定义方式，关于`iota还有哪些应用场景欢迎大家在评论区里指教`