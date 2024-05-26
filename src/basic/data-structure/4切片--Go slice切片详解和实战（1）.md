**切片区别于数组，是引用类型， 不是值类型。数组是固定长度的，而切片长度是可变的，我的理解是：切片是对数组一个片段的引用。**

# 定义

```go
var s1 []int    //定义一个存放int类型元素的切片
var s2 []string //定义一个存放string类型元素的切片
fmt.Println(s1, s2)
fmt.Println(s1 == nil) //true  为空  没有开辟内存空间
fmt.Println(s2 == nil) //true
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/8864e9f4141c4ad4b44b2ada5267dd5etplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

解析: 说明我们已经声明成功了，但是并没有开辟内存空间，因为s1、s2的值为nil

# 声明并初始化

我们可以在声明的同时初始化

```go
var s1 = []int{1, 2, 3}
var s2 = []string{"北苑", "长阳", "望京"}
fmt.Println(s1, s2)
fmt.Println(s1 == nil) //false
fmt.Println(s2 == nil) //false
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/7330ff452d7742f388cd4c6fb07c13e2tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

解析： 初始化成功，s1 s2的值都不等于nil

# 长度和容量

分别使用len()、cap()获得切片的长度和容量

```go
fmt.Printf("len(s1):%d cap(s1):%d\n", len(s1), cap(s1))
fmt.Printf("len(s2):%d cap(s2):%d\n", len(s2), cap(s2))
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/06b92f01f651461eaa43d501c0b185aatplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

解析： 和我们预期的一致，长度和容量都为3

# 由数组得到切片

开篇我已经提到数组和切片的关系，这里再进一步讲一下：

1. 切片的本质是操作数组，只是数组是固定长度的，而切片的长度可变的
2. 切片是引用类型，可以理解为引用数组的一个片段；而数组是值类型，把数组A赋值给数组B，会为数组B开辟新的内存空间，修改数组B的值并不会影响数组A。
3. 而切片作为引用类型，指向同一个内存地址，是会互相影响的。

```go
//定义一个数组
a1 := [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9}
s3 := a1[0:4] //基于一个数组切割  [0:4]左包含 右不包含  即为[1,2,3,4]
fmt.Println(s3)
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/8abb23b0f3d44573a3eabfb6cdef816ftplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

**注意：a1[0:4] 基于一个数组切割  [0:4]左包含 右不包含  即为[1,2,3,4]**

## 更多切割方式举例

```go
a1 := [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9}
s4 := a1[2:4] //[3 4]
s5 := a1[:4] //[1 2 3 4]
s6 := a1[2:] //[3 4 5 6 7 8 9]
s7 := a1[:]  //[1 2 3 4 5 6 7 8 9]
fmt.Println(s4)
fmt.Println(s5)
fmt.Println(s6)
fmt.Println(s7)
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/ee3c81a166314638bc297ca8c73a819btplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

解析： 都符合上面提到的`左包含，右不包含`原则 s4从下标2开始截取，截取到下标4 s5省略了第一个参数，表示从下标0开始截取 s6省略了第二个参数，表示截取到最后一个元素 s7省略了两个参数，只填写了中间的冒号:，表示取全部元素

## 切片的长度和容量

**切片的长度很好理解，就是元素的个数。**

切片的容量我们重点理解一下：**在切片引用的底层数组中从切片的第一个元素到数组最后一个元素的长度就是切片的容量**

### 我来画个图：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/4b7afda7b402460a9feb0939d7e55a7etplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

### 再举个栗子

我们看下面这个栗子就很好理解啦：

```go
a1 := [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9}

s5 := a1[:4] //[1 2 3 4]
s6 := a1[2:] //[3 4 5 6 7 8 9]
s7 := a1[:]  //[1 2 3 4 5 6 7 8 9]

fmt.Printf("len(s5):%d cap(s5):%d\n", len(s5), cap(s5)) //4 9
fmt.Printf("len(s6):%d cap(s6):%d\n", len(s6), cap(s6)) //7 7
fmt.Printf("len(s7):%d cap(s7):%d\n", len(s7), cap(s7)) //9 9
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/8c6b3bb1fa9e45bf85dd9be57e0caddctplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

解析： a1是数组长度为9，容量也为9，值是从1~9

s5/s6/s7都是切割数组a1得到的切片。

s5的长度为4，因为只有1 2 3 4这4个元素，容量为9，因为s5切片是从数组起始位置开始切割的：第一个元素是1，而s5底层数组a1最后一个元素是9，1~9共9个元素，所以s5的容量为9。

s6的长度为7，因为s6的元素是3~~9这7个元素；容量也为7，因为s5的底层数组最后一个元素是9，3~~9共7个元素，所以s6的容量为7。

S7更好理解了，长度和容量都是9，小伙伴们自己理解一下。

## 切片再切片

我们可以对切片进行再切片操作

比如，我们针对上面的数据再次切片进行测试

```go
s8 :=s6[3:]
//s8的值为：6 7 8 9
fmt.Printf("len(s8):%d cap(s8):%d\n", len(s8), cap(s8)) //4 4
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/bd8aaa9acf0a4545be6084aeac6e5111tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

解析：我们知道可以对切片进行再次切片就可以，至于长度和容器大家搞明白上面的栗子，这个输出结果就是意料之中的了。

# slice是引用类型

我们举个栗子来证明切片是引用类型

```go
//定义数组
a1 := [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9}
//由数组切割成切片s6
s6 := a1[2:] //[3 4 5 6 7 8 9]
//切片再次切片，赋值给s8
s8 :=s6[3:] //[6 7 8 9]
//修改原始数组，把下标为2的值由3改为333
a1[2] = 333
//打印s6，发现s6中的3也变成了333
fmt.Println("s6:", s6) //[333 4 5 6 7 8 9]
//因为s8基于s6切片而成，我们测试一下切片再切片的引用传的
fmt.Println("s8:", s8) //[6 7 8 9]
//我们把原始数组下标为5的值由6改为666
a1[5] = 666
//打印s8切片，得到结果6也变成了666
fmt.Println("s8:", s8) //[666 7 8 9]
```

打印结果：

![image.png](https://lips-wangzhongyang.oss-cn-beijing.aliyuncs.com/image/a0c2b1255cb6493892b695491f2c505dtplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

解析： **由此我们可以明确的知道切片是引用类型，当底层数组改变时，不管是切片，还是切片再切片，值都会改变。因为他们使用的是一个内存块，引用的一个内存地址。**

# 总结

**这篇文章介绍了切片的特点，如何定义切片，如果由数组切割切片，切片的引用类型特征。**