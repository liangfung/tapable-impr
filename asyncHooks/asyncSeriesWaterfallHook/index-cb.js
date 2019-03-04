class AsyncSeriesWaterfallHook {
  constructor() {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    let idx = 0
    let finialCB = args.pop()
    let next = (err, data) => {
      if (err || idx === this.tasks.length) return finialCB(err, data)
      let task = this.tasks[idx]
      if (idx === 0) {
        task(...args, next)
      } else {
        task(data, next)
      }
      idx++
    }
    next()
  }
}


class Test {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook()
    }
  }

  tap() {
    this.hooks.arch.tapAsync('a', (name, cb) => {
      setTimeout(() => {
        console.log('a', name)
        cb(null, 'aaa')
      }, 1000)
    })

    this.hooks.arch.tapAsync('b', (name, cb) => {
      setTimeout(() => {
        console.log('b', name)
        cb(null, 'bbb')
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