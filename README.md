# 作为高级前端不能不知道的知识点
### 开发中实际案例
[css 布局对齐问题](https://github.com/upgrace/high_study/issues/2#issue-608028496)

### js 事件、存储相关
[执行环境及执行栈](https://github.com/upgrace/high_study/issues/3#issue-608044559)

[事件循环机制](https://github.com/upgrace/high_study/issues/4#issue-608045198) 

[变量提升](https://github.com/upgrace/high_study/issues/5#issue-608046043)

[变量的存储空间及垃圾回收机制](https://github.com/upgrace/high_study/issues/6#issue-608046529)

[内容溢出的状况及如何避免](https://github.com/upgrace/high_study/issues/7#issue-608047054)  

### js基础相关           
[浅拷贝和深拷贝的实现](https://github.com/upgrace/high_study/issues/8#issue-608047920)

[null 与 undefined 的区别](https://github.com/upgrace/high_study/issues/9#issue-608048942)

[js解决跨域问题](https://github.com/upgrace/high_study/issues/10#issue-608050144)

[作用域链](https://github.com/upgrace/high_study/issues/11#issue-608050797)

[查看对象属性方法](https://github.com/upgrace/high_study/issues/12#issue-608051187)
      
[判断两值是否相等](https://github.com/upgrace/high_study/issues/13#issue-608051773)

[原型相关](https://github.com/upgrace/high_study/issues/14#issue-608053430)

[CSRF 及 XSS 攻击](https://github.com/upgrace/high_study/issues/23#issue-608061605)
      
### ES6 新特性或思想
[尾调用](https://github.com/upgrace/high_study/issues/15#issue-608053954)

[let const 存在暂时性死区](https://github.com/upgrace/high_study/issues/16#issue-608054399)

[彻底冻结对象](https://github.com/upgrace/high_study/issues/17#issue-608054744)

[全局变量和顶层变量](https://github.com/upgrace/high_study/issues/18#issue-608055262)

[generator 应用](https://github.com/upgrace/high_study/issues/20#issue-608057924)

[set, map, proxy, reflect](https://github.com/upgrace/high_study/issues/21#issue-608058672)

[class](https://github.com/upgrace/high_study/issues/22#issue-608059286)


#### Array.from, Array.of
     Array.from 定义： 将类数组对象、可遍历对象转化为真正的数组
                兼容性: const toArray = (() => Array.from ? Array.from : obj => [].slice.call(obj))();
                
     Array.of  定义: 将一组值转化为数组， 有点类似Array(3)
               区别： Array 只有一个参数的时候 会有歧义，定义的是生成数组的长度
    
      
#### interator 遍历器
    定义: 为不同的数据结构提供统一的访问机制
    具备接口的数据结构：Array, set, map, String, TypedArray, arguments, nodelist 对象
    用途： for... of
  

#### 正则表达式
     后行断言和后行否定断言 的执行顺序是从右像左的。
     
     注意： 尽量使用DFA，不要使用NFA，效率比较高
     https://segmentfault.com/a/1190000019763222
     
     
#### 修饰器 decorator 
      Mixin 模式：对象继承的一种替代方案
      实现：a) 在原型上增加修饰内容
           b) 在子类和父类间增加混入类
           
           let myMixin = (superclass) => class extends superClass {...} 
           
           class myClass extends myMixin(myBaseClass) {...}
#### ES6模块 CommonJS模块
    差异： CommonJS模块输出的一个值的复制，ES6模块输出的值的引用
          CommonJS是运行时加载，ES6模块是编译时输出接口 - 动态加载应用
    
    说明： 遇到循环加载的问题时：返回当前加载文件已经执行的部分，而不是全部执行后的值
     

#### http相关的
     代理： 为什么使用代理: 可以对所有看到并接触到的流过的http流量进行监视并修改，实现有用的增值服务。
           如过滤器、文档访问控制、设置防火墙、反向代理、web缓存等
           代理和网关的区别：
            代理连接的是两个或多个使用相同协议的应用程序；网关连接的多个使用不同协议的端点
        
### web缓存
     优点： 减少了冗余的数据传输，节省网络费用
           缓解了网络瓶颈问题,不需更多的带宽就能更快的加载页面 -- 带宽瓶颈
           降低了对原始服务器的要求，服务器可以更快的相应，避免过载 -- 瞬间拥塞(爆炸性新闻、名人事件)
           降低了距离时延，引起的网页加载慢
### 缓存的处理步骤
    1. 接受-缓存从网络接受请求报文
    2. 解析-缓存解析出URL和各种首部
    3. 查询-缓存查询本地是否有本地副本可用，没有就去服务器去请求一份
    4. 新鲜度检测 -缓存查看已换岑副本是否足够新鲜，如果不是就询问有任何更新
    5. 创建相应 -- 缓存会用新的首部和已缓存的主体来构建一条相应报文
    6. 发送 -- 缓存将响应发送给客户端
    7. 日志 -- 缓存可选的创建一个日志文件条目来描述这个事务

   ![image](https://github.com/upgrace/high_study/raw/master/static/cache_flow.png)
### 代理
    客户端配置代理的问题(PAC文件)：
    定义: PAC文件是一些小型的javascript程序，可以在运行的过程中计算代理设置;(必须定义一个findProxyForURL(url, host)的函数)
    缺点：比较死板，只能为内容制定唯一的代理服务器； 不支持故障转移；
    说明: http规范禁止一般的拦截代理在转发URI时重写绝对路径部分，唯一的例外是 可以用 ‘/’取代空路径
   
### 文档命中率和字节命中率
    字节命中率表示的是缓存提供的字节在传输的所有字节中所占的比例；文档命中率表示的是缓存提供的文档在所有文档中所占的比例；
    字节命中率 对节省带宽很有利；文档命中率对降低整体时延很有好处
    
### 缓存header中判断字段 -- 
    1) expries/ cache-control:no-store, no-cache, max-age, must-revalidate -- 描述文档过期
         no-store: 禁止缓存对响应进行复制，直接发给客户端
         no-cache: 可以存储在本地的缓存区，但是在与原始服务器进行新鲜度检验之前不能提供给客户端使用
         must-revalidate: 可以提供一些陈旧的对象,提高性能，但是在与服务器进行新鲜度检验期不能提供陈旧副本
    2) etags/ if-none-match
    
    3) last-modified/ if-modified-since

#### 为什么有last-modified还会有etags
    1） 有些文档可能会被周期性的重写，但实际包含的内容是一致的，只有修改日期变化了
    2） 有些文档虽然修改了，但是修改的内容不中澳，无需全范围的缓存都重装数据 -- 拼写、注释的修改
    3) 有些文档修改的间隙太短，不太建议频繁的更新

#### http与https区别
    http: 缺点：传输的数据都是明文的，因此使用HTTP协议传输隐私信息非常不安全。
    https：HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全
    https的工作原理：
   （1）客户使用https的URL访问Web服务器，要求与Web服务器建立SSL连接。
　　（2）Web服务器收到客户端请求后，会将网站的证书信息（证书中包含公钥）传送一份给客户端。
　　（3）客户端的浏览器与Web服务器开始协商SSL连接的安全等级，也就是信息加密的等级。
　　（4）客户端的浏览器根据双方同意的安全等级，建立会话密钥，然后利用网站的公钥将会话密钥加密，并传送给网站。
　　（5）Web服务器利用自己的私钥解密出会话密钥。
　　（6）Web服务器利用会话密钥加密与客户端之间的通信。
    缺点：
   （1）HTTPS协议握手阶段比较费时，会使页面的加载时间延长近50%，增加10%到20%的耗电；
　　（2）HTTPS连接缓存不如HTTP高效，会增加数据开销和功耗，甚至已有的安全措施也会因此而受到影响；
　　（3）SSL证书需要钱，功能越强大的证书费用越高，个人网站、小网站没有必要一般不会用。
　   (4）SSL证书通常需要绑定IP，不能在同一IP上绑定多个域名，IPv4资源不可能支撑这个消耗。
　　（5）HTTPS协议的加密范围也比较有限，在黑客攻击、拒绝服务攻击、服务器劫持等方面几乎起不到什么作用。最关键的，SSL证书的信用链体系并不安全，特别是在某些国家可以控制CA根证书的情况下，中间人攻击一样可行。
  
  ### http 的用户识别机制
    1.承载用户身份信息的http首部：
        From(包含用户的E-mail地址)；User-Agent(将用户浏览器的相关信息告诉服务器)；Referer(用户来源页面的URL)
        说明：From, User-Agent 和 Referer 首部不足以实现可靠的识别
    2.客户端IP：IP地址容易伪造
    3. 用户登录： 登录不同站点比较繁琐
    4. 胖URL， 一种在URL中嵌入识别信息的技术 -- 无法共享、破话缓存、额外的服务器负荷
    5.cookie 一种功能强大且高效的持久身份识别技术
    基本思想: 让浏览器积累一组服务器特有的信息，每次访问服务器时都将这些信息提供给它
    说明: 响应中set-cookie首部要特别小心,如果向多个用户set-cookie首部，可能会破坏用户的定位。 
         比较好的方法： cache-contorl: must-revalidate, max-age = 0;
### CDN
  
    定义: 内容分发网络。本质仍然利用缓存技术, 解决的是如何将数据快速可靠从源站传递到用户的问题。
    优点：提升页面首次加载的速度
    1. 缓解服务器可能出现的访问拥赛问题
    2. 将数据缓存在离用户最近的地方，减少距离时延等，用户以最快的速度获取


### 函数柯里化
    定义: 把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术
    应用： add(1, 2, 3) => add(1)(2)(3)
    
    function add (a) {
        var args = [].slice.call(arguments);

        function sum () {
          args = args.concat([].slice.call(arguments))
          return sum
        }

        sum.toString = function () {
          return args.reduce(function (a, b) { return a + b}, 0)
        }
        return sum
  }

  add(3, 3)(3, 3)(3, 3)
    
