// let { SyncHook } = require('tapable')

class SyncHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    this.tasks.forEach(task => {
      task(...args)
    })
  }
}

class Animal {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['name', 'aa', 'c'])
    }
  }

  tap() {
    this.hooks.arch.tap('cat', (...args) => {
      console.log(...args)
    })
  }

  start(...arg) {
    this.hooks.arch.call(...arg)
  }
}

let cat = new Animal()

cat.tap()
cat.start('kiti', 'nn', 'aa')
