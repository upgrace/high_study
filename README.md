# 作为高级前端不能不知道的知识点
### js 执行环境及执行栈
    https://segmentfault.com/a/1190000017890535
### js 事件循环机制
    https://juejin.im/post/59e85eebf265da430d571f89
### js 变量提升
###### 什么是变量提升
###### 变量提升的优先级
https://github.com/yygmind/blog/issues/12

### js 变量的存储空间及垃圾回收机制

### js 深拷贝的实现

### js中 null 与 undefined 的区别
 ##### null 与 undefined 基本是同义的，只有细微的区别。
 ###### `null表示"没有对象"，即该处不应该有值。典型用法是：
      1） 作为函数的参数，表示该函数的参数不是对象。
      2） 作为对象原型链的终点。`
###### `undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：
      1）变量被声明了，但没有赋值时，就等于undefined。
      2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。
      3）对象没有赋值的属性，该属性的值为undefined。
      4）函数没有返回值时，默认返回undefined。`
