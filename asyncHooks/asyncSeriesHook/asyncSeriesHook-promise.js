const isPromise = (promise) => promise instanceof Promise

class AsyncSeriesHook {
  constructor() {
    this.tasks = []
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  callPromise(...args) {
    /** 实现一： 使用shift  */
    // let next = () => {
    //   if(!this.tasks.length) return Promise.resolve()
    //   let task = this.tasks.shift()
    //   let promise = task(...args)
    //   if(!isPromise(promise)) {
    //     throw new Error('tapPromise传入的函数必须要返回promise')
    //   }
    //   return promise.then(next)
    // }
    // return next()

    /** 实现二： 使用reduce */
    const [ firstTask, ...other ] = this.tasks
    return other.reduce((promise, next) => {
      return promise.then(() => next(...args))
    }, firstTask(...args))
  }
}


/** use case */
class Test {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
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
      // console.log('bbb')
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('b', name)
          resolve()
        }, 3000)
      })
    })
  }

  call() {
    this.hooks.arch.callPromise('hehe').then(() => console.log('end'))
  }
}

let t = new Test()
t.tap()
t.call()