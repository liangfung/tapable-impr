class AsyncSeriesHook {
  constructor() {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    let finialCB = args.pop()
    let idx = 0
    let next = () => {
      if(idx === this.tasks.length) return finialCB()
      this.tasks[idx++](...args, next)
    }
    next()
  }
}


// case
class Test {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
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