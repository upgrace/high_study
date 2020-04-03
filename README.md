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
       
       变量提升：将变量的定义提升到父作用域的顶部，默认等于undefined
       函数提升：将变量的定义整体提升,包括赋值
       函数字面量提升: 与变量提升相同
       
       https://www.cnblogs.com/pqjwyn/p/5365532.html
       
       ES6 中let const 不存在变量提升的问题， 并且产生了块级作用域。
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
      缺点：a) 无法处理循环引用问题
           b) 无法拷贝特殊的对象，如 RegExp, Date, Set, Map 等 在序列化的时候会丢失
           c) 无法拷贝函数
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


### js解决跨域问题
##### 同源策略
      同源策略是浏览器的安全基石,同源策略是指 请求资源的协议、域名、端口号和当前网址的完全一样。
##### 常用的方法及工作原理

###### 常用的方法
###### CORS、jsonp、iframe、script、代理、反代理
       CORS: 定义: 跨域资源共享（ CORS ）机制允许 Web 应用服务器进行跨域访问控制，从而使跨域数据传输得以安全进行
             原理: 跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源
                  a)针对简单请求(get, post, head)直接请求(request 中带有origin字段)，response中带有access-control-allow-origin，根据  
                    Origin 和 Access-Control-Allow-Origin 就能完成最简单的访问控制是否支持
                  b)需预检的请求(delete、put、connect、options、trace、patch)首先使用options方法发起一个预检请求到服务器，以获知服务器是否
                    允许该实际请求
                  说明: 一般跨域的请求是不允许携带身份凭证的,如果需要，服务器端的响应要携带 Access-Control-Allow-Credentials: true

      jsonp：定义: 通过请求script标签实现跨域请求，然后在服务端输出JSON数据并执行回调函数
             原理：1.首先在客户端注册一个callback方法，放到window对象上，然后把callback的名字（callbackFunction）传给服务器。
                  2.服务器先生成 JOSN 数据。
                  3.将 JOSN 数据直接以入参的方式，放置到 function 中，后生成了一段 js 语法的文档（如callbackFunction(JOSN),返回给客户端。
                  4.客户端浏览器，将返回的JS标签插入DOM，解析script标签后，会执行callbackFunction(JOSN)
     正向代理：定义： 客户端要向代理服务器发送一个请求，并指定目标服务器，代理服务器将目标服务器返回的数据转交给客户端
             原理：

     反向代理：定义：客户端将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，在返回给客户端，
                  此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器IP地址-- 客户端不需要做什么
             原理：

     反向代理的好处: https://juejin.im/post/5bacbd395188255c8d0fd4b2


###### 作用域链
      定义：作用域链：当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中
      提示：作用域链和原型继承查找时的区别：
              如果去查找一个普通对象的属性，但在当前对象和其原型中都找不到时，会返回undefined；但查找的属性在作用域链中不存在的话就会抛出ReferenceError。

##### 对象中 in，hasOwnproperty, Object.keys, Object.getOwnPropertyNames, Object.assign， Object.getOwnPropertySymbols, reflect.ownKeys
      in: 返回无论是实例自身及原型上的属性, 不包括symbol属性
      hasOwnproperty： 返回实例自身的属性，不包括symbol属性
      Object.keys: 返回实例自身可访问的属性，不包括symbol属性
      Object.getOwnProtertyName: 返回实例的所有属性，无论是否可访问
      JSON.stringify: 串化对象自身的可枚举的属性
      Object.assign: 复制对象自身的可枚举的属性
      Object.getOwnPropertySymbols: 对象自身的所有可枚举的symbol属性
      Reflect.ownKeys: 对象自身的所有属性，不管是否是symbol 也不管是否可枚举

#### 判断两值是否相等, ==, ===, Object.is()
    == 会强制内容转化
    === NaN 不等于 NaN，+0 等于 -0
    Object.is 解决了上述所有问题，通过ES5实现如下：
    Object.defineProperty(Object, 'is', {
      value: function (x, y)  {
          if (x === y) {
               // 针对 +0 不等于-0 的情况
               return x !== 0 && 1 / x ！== 1 / y
            }
            // 针对 NaN的情况

            return x !== x && y !== y
        },
        configurable: true,
        enumerable: false,
        writable: true
    })
#### 修改对象原型的方法 Object.setProperty, Object.create, [obj]._proto_

#### ...: 解构赋值是一种浅拷贝，并且不是拷贝原型上的属性

#### 尾调用: 
     定义: 一个函数的最后是调用另外一个函数
     优点: 不需要保留外部的调用帧，因为调用位置、内部变量都信息都不会用到了，直接将内部函数替代外城函数的调用帧即可
     案例：递归函数容易引起内存泄漏，可以使用尾调用优化
         function factorial (n) {
            if (n === 1) return 1;
            return n * factorial(n-1);
         } 复杂度 o(n)
         
         function factorial (n, total) {
            if (n === 1) return total;
            
            return factorial(n-1, n * total);
         } 复杂度O(1)
     Tips: 尾调用优化只能在严格模式下使用, 因为尾递归会导致function中的arguments、caller失效；非严格模式下实现尾递归优化：
        function tco (f) {
          var value
          var active = false;
          var accumulated = [];
          return function accumulator () {
            accumulated.push(arguments)
            if (!active) {
              active = true;
              while (accumulated.length) {
                value = f.apply(this, accumulated.shift());}
                active = false;
                return value;
            }
          }
        };

        var sum= tco(function(x, y) {
          if (y>0) {
            return sum(x + 1, y - 1)
          } else {
            return x
          }
        });
        sum(1, 10)
####  let const 存在暂时性死区的说话
      原理: 只要进入当前作用域，所要使用的变量就己经存在，但是 不可获取，只有等到声明变量的那 一行代码出现 ， 才可以获取和使用该变量。
      作用：为了减少运行时的错误，防止在变量声明前使用变量

#### 彻底冻结对象的函数：
      var constantize = (obj) => {
          Object.freeze(obj);
          
          Object.keys(obj).forEach((key, i) => {
             if (typeof obj[key] === 'object') {
                constantize(obj[key])
             }
          })
      }
 ##### ES5 中全局变量和顶层变量是一样的，ES6是可以区分的
      说明: 在不同的运营环境中，顶层对象的实现是不一致的。
      在浏览器中，顶层对象是 window,但 Node 和 Web Worker 没有 window。 
      在浏览器和 Web Worker 中， self 也指向顶层对象，但是 Node 没有 self。 
      在 Node 中，顶层对象是 global，但其他环境都不支持。
      简单实现：
      // 方法一
      (typeof window != = 'undefined'
            ? window 
            :(typeof process === 'bject' && typeof require === 'function' && typeof global === 'object' )
            ? global 
            :this);
        // 方法二
        var getGlobal = function () {
            if (typeof self !== 'undefined') { return self; )
            if (typeof window !== 'undefined' ) { return window; ) 
            if (typeof global !== 'undefined') { return global; )
            throw new Error (’unable to locate global object ’);

      垫片库： https://github.com/es-shims/globalThis

#### Array.from, Array.of
     Array.from 定义： 将类数组对象、可遍历对象转化为真正的数组
                兼容性: const toArray = (() => Array.from ? Array.from : obj => [].slice.call(obj))();
                
     Array.of  定义: 将一组值转化为数组， 有点类似Array(3)
               区别： Array 只有一个参数的时候 会有歧义，定义的是生成数组的长度
#### 如何判断一个对象是数组：
    instanceof: 利用原型链来判断，缺点：原型可以重新定义； 多个全局环境中的 Array.prototype 不相等
    constructor: 实例的构造函数属性constructor指向构造函数 缺点： 多个全局环境中的 Array.prototype 不相等
    Array.isArray(): 有兼容性问题
    Object.prototype.toString.call(obj): 最常用的方法
    
    考虑到兼容性：
    const isArray = (() => {Array.isArray ? Array.isArray ? (obj) => Object.prototype.toStirng.call(obj) === '[object, Array]'})();
      
#### interator 便利器
    定义: 为不同的数据结构提供统一的访问机制
    具备接口的数据结构：Array, set, map, String, TypedArray, arguments, nodelist 对象
    用途： for... of

#### symbol 对象的应用 

### generator 应用
     核心： 能够暂停和恢复执行任务，是其能实现异步任务的根本原因
     应用： 将数组扁平化操作
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
            '[object Symbol]': 'symbol',
            '[object Set]': 'set',
            '[object Map]': 'map'
          }
          return map[toString.call(obj)]
        }
 
          function* flat(n) {
              function isArray(arr) {
                return ['array', 'set'].includes(typeOf(arr))
              }
              if (isArray(n)) {
                for (let i of n) {
                  if (isArray(i)) {
                    yield* flat(i)
                  } else {
                    yield i
                  }
                }
              }
            }
  
 #### Set 数据结构
      去重原则： NaN 等于 NaN, {} !== {}
      应用： 可以使用... 轻易实现 交集、并集和差集
      
#### WeakSet 数据结构
     说明： WeakSet 的数据结构只能是对象，而且是对象的弱引用，如果其他对象不在引用该对象，垃圾回收机制就会自动回收该对象所占用的内存
     用处：储存DOM节点，不用担心节点从文档删除时会引发内存泄漏。
     
#### Proxy 在目标对象前对外界的访问设置了一个"拦截"层
     注意： has 只对in操作拦截，对for...in 操作没有作用， 拦截的是hasProperty操作不是 hasOwnProperty操作

#### Reflect 
     定义：为了操作对象而提供的新API，让Object的操作都变成函数行为
      
#### 正则表达式
     后行断言和后行否定断言 的执行顺序是从右像左的。
     
     注意： 尽量使用DFA，不要使用NFA，效率比较高
     https://segmentfault.com/a/1190000019763222
     
#### class的继承
    ES5 继承实质是先创造子类的实例对象this，再将父类的方法添加到this上。ES6的继承机制完全不同，先创造父类的实例对象this(所以必须先调用super方法),再用子类的构造函数修改this。
    
    ES6 class 有两条继承链条： 
      子类的_proto_属性表示构造函数的继承，总是指向父类
      子类prototype 属性的_proto_属性表示方法的继承，总是指向父类的prototype
      
      Object.setPrototypeOf = function (obj, proto) {
        obj._proto_ = proto;
        return obj;
      }
     
     
