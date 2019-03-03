const { AsyncParallelHook } = require('tapable')

class Test {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }

  tap() {
    this.hooks.arch.tapAsync('a', (name, cb) => {
      setTimeout(() => {
        console.log('a', name)
        cb()
      }, 1000)
    })

    this.hooks.arch.tapAsync('b', (name, cb) => {
      setTimeout(() => {
        console.log('b', name)
        cb()
      }, 3000)
    })
  }

  call() {
    this.hooks.arch.callAsync('xixi', (...args) => {
      console.log('end', ...args)
    })
  }
}

let t = new Test()
t.tap()
t.call()