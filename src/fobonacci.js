function* fibonacci () {
  let [pre, next] = [0, 1];
  for (;;) {
    [pre, next] = [next, pre + next]
    yield pre
  }
}

for (let n of fibonacci()) {
  if (n > 1000) {
    break;
  }
  yield n
}
