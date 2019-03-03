class AsyncParallelHook {
  constructor() {
    this.asyncTasks = []
    this.endNum = 0
    this.cb = null
  }

  resolveTask(idx) {
    this.asyncTasks[idx]['status'] = 'end'
    this.endNum++
    if (this.endNum === this.asyncTasks.length) {
      this.cb()
    }
  }

  tapAsync(name, task) {
    this.asyncTasks.push({
      status: 'pending',
      task
    })
  }

  callAsync(...args) {
    this.cb = args[args.length - 1]
    let params = args.slice(0, -1)
    this.asyncTasks.forEach((task, index) => {
      task.task(...params, () => { this.resolveTask(index) })
    })
  }
}

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
        // cb()
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