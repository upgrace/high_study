const isObject = function (value) {
  const type = typeof value

  return type !== null && (type === 'object' || type === 'function')
}
