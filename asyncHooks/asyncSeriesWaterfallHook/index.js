class AsyncSeriesWaterfallHook {
  constructor() {
    this.tasks = []
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  promiseAsync(...args) {
    let [firstTask, ...other] = this.tasks
    return other.reduce((promise, nextP) => {
      return promise.then(nextP)
    }, firstTask(...args))
  }
}

let hook = new AsyncSeriesWaterfallHook()
hook.tapPromise('a', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('a', name)
      resolve(123)
      // reject()
    }, 1000)
  })
})

hook.tapPromise('b', (name) => {
  // console.log('bbb')
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('b', name)
      resolve()
    }, 3000)
  })
})
hook.promiseAsync('aaa')
  .then(() => { console.log('end') })
  .catch(() => { console.log('err') })