# 回顾

上一篇文章我们介绍了切片slice的定义初始化、引用类型特征、如何使用数组切割成切片。

这篇文章介绍切片的生成make()、切片的追加append()、切片的复制copy()。对知识点进行详细介绍和应用实战。

# 加深理解

1. 切片的本质：切片的本质是一个框，框住了一块连续的内存
2. 切片属于引用类型，真正的数据都是保存在底层数组里的
3. 切片可以简单理解为是快捷方式，修改会互相影响
4. 判断一个切片是否为空，使用len(s) == 0 判断，不能使用 s==nil 判断

# 生成切片 make

上需求：请定义一个长度为5，容量为10的整型切片。

上代码：

```go
s1 := make([]int,5,10)
fmt.Printf("s1：%v len(s1)：%d cap(s1)：%d\n", s1, len(s1), cap(s1))
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/15baffe5406740709dd9cda784c04431tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

**分析：make()函数的第一个参数指定切片的数组类型，第二个参数指定切片的长度，第三个参数指定切片的容量。**

# 更好的理解长度和容量

```go
s1 := make([]int,5,10)
fmt.Printf("s1：%v len(s1)：%d cap(s1)：%d\n", s1, len(s1), cap(s1))

s2 := make([]int, 0, 10)
fmt.Printf("s2=%v len(s2)=%d cap(s2)=%d\n", s2, len(s2), cap(s2))
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/8b5a7096c60e425f83f1e7671a6d4072tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

**分析： 我们可以发现定义切片时元素的个数和长度相关，因为长度就是元素的个数。**

容量我们在下面介绍append()时，重点介绍一下。

# 切片引用类型实战

上代码

```go
//切片
s3 := make([]int, 3, 3)
s3 = []int{1, 2, 3}
s4 := s3            //s3 s4都指向同一个底层数组
fmt.Println(s3, s4) //[1 2 3]  [1 2 3]
s3[0] = 1000
fmt.Println(s3, s4) //[1000 2 3] [1000 2 3]
fmt.Println("-----")

//数组
a3 := [3]int{1, 2, 4}
a4 := a3            //数组类型 a4会开辟新的内存空间
fmt.Println(a3, a4) //[1 2 4] [1 2 4]
a3[0] = 1000
fmt.Println(a3, a4) //[1000 2 4] [1 2 4]
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/680c8b226a1f4ce48c07c72107d77bc4tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

**分析：通过上面的打印结果我们可以很直观的看出来，切片引用类型的本质，当切片修改时会互相影响；而数组作为值类型，不会互相影响。**

## 切片的遍历

和数组一样，用fori或者for range进行遍历即可。

```go
s3 := make([]int, 3, 3)
s3 = []int{1, 2, 3}

for i := 0; i < len(s3); i++ {
   fmt.Println(s3[i])
}

for i, v := range s3 {
   fmt.Println(i, v)
}
```

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/f194619a265b46d09ede7e31541992cetplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

# append

首先，我们定义一个切片

```go
s1 := []string{"北京", "上海", "大连", "佛山"}
fmt.Printf("s1=%v len(s1)=%d cap(s1)=%d\n", s1, len(s1), cap(s1))
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/21298310f7804ea1906d73f039222402tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

**分析：我们发现切片的长度和容量都是4**

然后，我们使用append()函数追加一个元素

```go
s1 := []string{"北京", "上海", "大连", "佛山"}
fmt.Printf("s1=%v len(s1)=%d cap(s1)=%d\n", s1, len(s1), cap(s1))

s1 = append(s1, "唐山") //切片append()追加之后，
fmt.Printf("s1=%v len(s1)=%d cap(s1)=%d\n", s1, len(s1), cap(s1))
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/11f9d0ecf18344479d849a4659fc0cfbtplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

分析：长度由4变成5，我们很好理解；容量为什么会从4变成8呢？

**这是Go语言对切片的自动扩容机制。append()追加元素，原来的底层数据容量不够时，go底层会把底层数组替换，是go语言的一套扩容策略**

我后面会单独写一篇来讲自动扩容策略是如何实现的。欢迎大家持续关注我的专栏[Go语言学习专栏](https://juejin.cn/column/7064777730532835336)

## 多次追加

多次追加的概念很好理解，就是多次调用append()

举个栗子：

```go
s1 := []string{"北京", "上海", "大连", "佛山"}
fmt.Printf("s1=%v len(s1)=%d cap(s1)=%d\n", s1, len(s1), cap(s1))

s1 = append(s1, "唐山") //切片append()追加之后，
fmt.Printf("s1=%v len(s1)=%d cap(s1)=%d\n", s1, len(s1), cap(s1))

var s2 []string
s2 = append(s1, "雄安")
fmt.Printf("s2=%v len(s2)=%d cap(s2)=%d\n", s2, len(s2), cap(s2))
```

打印结果： ![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/5395f1cc67dd49b2aa8baeab862be4bbtplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

分析： s1经过两次append追加元素，赋值给了s2

## 追加多个元素

当我们需要追加多个元素时，难道只能像上面这样多次调用append吗？

当然不是的。

举个栗子：

```go
s1 := []string{"北京", "上海", "大连", "佛山"}
s3 := []string{"太原","石家庄"}
var s4 []string
s4 = append(s1,s3...) // ...表示拆开，将切片的值作为追加的元素
fmt.Printf("s4的值：%v",s4)
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/b63cd8963b54448f81dd6b75db712c12tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

**注意：append的第二个参数，我们传入了一个切片，需要在切片后写死...，表示将切片切割，将切片的值作为追加到第一个参数中的元素。**

# 复制切片

下面演示两种方式：

```go
//定义切片s1
s1 := []int{1, 2, 3}

//第一种方式：直接声明变量 用=赋值
//s2切片和s1引用同一个内存地址
var s2 = s1

//第二种方式：copy
var s3 = make([]int, 3)
copy(s3, s1)            //使用copy函数将 参数2的元素复制到参数1
fmt.Println(s1, s2, s3) //都是[1 2 3]
```

打印结果：都返回[1 2 3]

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/6a57cb6a25774442a391db6d64b13e86tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

**注意：var和:=不能同时使用，这种是错误的写法 ：var s3 := make([]int, 5)**

聪明的小伙伴们是不是提出疑问了呢？

既然结果一样，为什么要引出copy这个函数呢？

咱们接着往下看，就知道所以然了。

```go
//定义切片s1
s1 := []int{1, 2, 3}

//第一种方式：直接声明变量 用=赋值
//s2切片和s1引用同一个内存地址
var s2 = s1

//第二种方式：copy
var s3 = make([]int, 3)
copy(s3, s1)            //使用copy函数将 参数2的元素复制到参数1

s1[0] = 11
fmt.Printf("s1:%v s2:%v s3:%v",s1, s2, s3) //s1和s2是[11 2 3] s3是[1 2 3]
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/c9d215af8cae4a768d0aaa96fdee8a10tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

**分析： 我们发现s1和s2是[11 2 3] s3是[1 2 3]，说明copy方法是复制了一份，开辟了新的内存空间，不再引用s1的内存地址，这就是两者的区别。**

# 删除元素

**注意：删除切片中的元素 不能直接删除 可以组合使用分割+append的方式删除切片中的元素**

举个栗子：比如切除s3中的元素2(下标为1的元素)

```go
s3 := []int{1, 2, 3}
s3 = append(s3[:1], s3[2:]...) //第一个不用拆开 原因是一个作为被接受的一方  是把后面的元素追加到第一个
fmt.Println(s3)                
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/70be5a13e19f46c4a6698a8e1aa176a1tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

**注意：上面代码段中有我添加的注释：append()函数中第一个切片不用拆开，原因是一个作为被接受的一方，是把后面的元素追加到第一个切片中。**

# 数组转切片

```go
a1 := [...]int{1,2,3}
s1 := a1[:]
fmt.Printf("a1类型：%T\ns1类型：%T",a1,s1)
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/4b6a009f8be24cb79052b8408d455fcctplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

# 实战演练

猜想一下下面程序的运行结果：

```go
s1 := make([]int, 5, 10)
for i := 0; i < 10; i++ {
   s1 = append(s1, i)
}
fmt.Println(s1)
```

先

不

要

看

答

案

.

.

.

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/65f3436f492a41a586cf418b6f64525ftplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

分析： 我们静下心来逐步推导就ok了：

1. s1 := make([]int, 5, 10) 生成的是切片： [0 0 0 0 0]
2. for循环中每次将自增的i值追加到上面的切片中
3. 所以最终打印的结果是：[0 0 0 0 0 0 1 2 3 4 5 6 7 8 9]

# 总结

这篇文章汇总了使用make生成切片、使用append追加切片元素、使用copy复制切片，开辟新的内存空间、使用切片分割和append来删除切片。