class AsyncParallelHook {
  constructor() {
    this.asyncTasks = []
  }

  tapPromise(name, task) {
    this.asyncTasks.push(task)
  }

  promise(...args) {
    let tasks = this.asyncTasks.map(task => task(...args))
    return Promise.all(tasks)
  }
}

class Test {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }

  tap() {
    this.hooks.arch.tapPromise('a', (name) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('a', name)
          resolve()
        }, 1000)
      })
    })

    this.hooks.arch.tapPromise('b', (name) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('b', name)
          resolve()
        }, 3000)
      })
    })
  }

  call() {
    this.hooks.arch.promise('hehe').then(() => console.log('end'))
  }
}

let t = new Test()
t.tap()
t.call()