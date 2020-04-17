function Tree (left, label, right) {
  this.left = left
  this.label = label
  this.right = right
}
let count = 0

function* inOrder (n) {
  if (n) {
    debugger
    yield* inOrder(n.left)
    yield n.label
    yield* inOrder(n.right)
  }
}

function make (array) {
//判断是否 为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}

var node = make([[['a'],'b', ['c']], 'e' ,['g']])

let result = []

for (let key of inOrder(node)) {
  result.push(key)
}

console.log(result)
console.log(count)
console.log(node)


let res = []
function* g(arr) {
  for (let a of arr) {
    if (typeof a === 'array') {
      yields* g(a)
    } else {
      res.push(a)
      yield a
    }
  }
}


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
    '[object Object]': 'object',
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

for(let val of flat([1, 3, [3, 4], new Set([2, 4, 5])])) {console.log(val)}
