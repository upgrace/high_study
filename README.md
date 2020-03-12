# 作为高级前端不能不知道的知识点
### js 执行环境及执行栈
    https://segmentfault.com/a/1190000017890535
### js 事件循环机制
    https://juejin.im/post/59e85eebf265da430d571f89
### js 变量提升
###### 什么是变量提升
       引擎会在解释JavaScript代码之前首先对齐进行编译，编译过程中的一部分工作就是找到所有的声明，并用合适的作用域将他们关联起来，这也正是词法作用域的核心内容
###### 变量提升的具体操作
       变量提升包括: 变量提升，函数提升, 函数字面量提升
       
       变量提升：
       函数提升：
       函数字面量提升: 与变量提升相同
       
       ES6 中let const 不存在变量提升的问题， 并且产生了块级作用域。
###### 变量提升的优先级
###### 变量提升的优先级
https://github.com/yygmind/blog/issues/12

### js 变量的存储空间及垃圾回收机制
    基本数据类型 存储在栈，复杂数据类型存储在堆中， 常量存储在池中。
    tips: 闭包中的变量存储在堆中.
    
    垃圾回收机制：js有自动的垃圾回收,核心思想就是如何判断内存已经不再使用,主要有两种算法: 
        1. 引用计数 -- 不在建议使用
           依据：就是看一个对象是否有指向它的引用
           缺点: 循环引用如果两个对象相互引用，尽管他们已不再使用，但是垃圾回收器不会进行回收，最终可能会导致内存泄露。
        2. 标记清除 -- 
           依据:无法到达的对象”。从根部（在JS中就是全局对象）出发定时扫描内存中的对象，凡能从根部到达的对象，保留,反之标记为不再使用，稍后进行回收。
           
### 几种常见的容易引起内容溢出的状况及如何避免
     1. 全局变量
     2. 递归未结束条件
     3. 闭包
     4. 脱离dom的引用     
     https://github.com/yygmind/blog/issues/16
     https://www.w3cschool.cn/chromedevtools/8ko91oeg.html

     如何使用chrome 分析内存泄漏问题
     https://blog.csdn.net/c11073138/article/details/84700482


### js 浅拷贝和深拷贝的实现
 数组浅拷贝：splice(0), concat, ...(扩展运算符)
 对象浅拷贝: Object.assign, ...(扩展运算符)
   说明 1.Object.assign 会跳过那些值为null 或 undefined 的源对象
   
          let a = { b: {c:4} , d: { e: {f:1}} }
          let g = Object.assign({},a)
          let h = JSON.parse(JSON.stringify(a));
          console.log(g.d)      // { e: { f: 1 } }
          
          g.d.e = 32
          console.log('g.d.e set to 32.') // g.d.e set to 32.
          console.log(g) // { b: { c: 4 }, d: { e: 32 } }
          console.log(a) // { b: { c: 4 }, d: { e: 32 } }
          console.log(h) // { b: { c: 4 }, d: { e: { f: 1 } } }
          
          h.d.e = 54
          console.log('h.d.e set to 54.') // h.d.e set to 54.
          console.log(g) // { b: { c: 4 }, d: { e: 32 } }
          console.log(a) // { b: { c: 4 }, d: { e: 32 } }
          console.log(h) // { b: { c: 4 }, d: { e: 54 } }

 
数组、对象深拷贝: 
    1. JSON.parse(JSON.Stringfy(obj))
    2. 自己开发deepCopy方法
    
    function typeOf (obj) {
      const toString = Object.prototype.toString
      const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'，
        '[object Symbol]': 'symbol'
      }
      return map[toString.call(obj)]
    }
    
    function isArray (object) {
      return typeOf(object) === 'array'
    }

    function isObject (object) {
      return typeOf(object) === 'object'
    }
    
    function deepCopy (data) {
      let o
      if (isArray(data)) {
        o = []
      } else if (isObject(data)) {
        o = {}
      } else {
        return data
      }
      if (isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          o.push(deepCopy(data[i]))
        }
      } else if (isObject(data)) {
        for (let i in data) {
          o[i] = deepCopy(data[i])
        }
      }
      return o
     }
### js中 null 与 undefined 的区别
 ##### null 与 undefined 基本是同义的，只有细微的区别。
 ###### null表示"没有对象"，即该处不应该有值。典型用法是：
      1） 作为函数的参数，表示该函数的参数不是对象。
      2） 作为对象原型链的终点。
###### undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：
      1）变量被声明了，但没有赋值时，就等于undefined。
      2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。
      3）对象没有赋值的属性，该属性的值为undefined。
      4）函数没有返回值时，默认返回undefined
  
