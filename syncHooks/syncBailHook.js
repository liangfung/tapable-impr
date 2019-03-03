class SyncBailHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    let ret
    let idx = 0
    do {
      ret = this.tasks[idx++](...args)
    } while (ret === undefined && idx < this.tasks.length)
  }
}

class Animal {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(['name'])
    }
  }

  tap() {
    this.hooks.arch.tap('cat', (...args) => {
      console.log('cat', ...args)
      return 'hah'
    })
    this.hooks.arch.tap('dog', (...args) => {
      console.log('dog', ...args)
    })
  }

  start(...arg) {
    this.hooks.arch.call(...arg)
  }
}

let cat = new Animal()

cat.tap()
cat.start('hello')