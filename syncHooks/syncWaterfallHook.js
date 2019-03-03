/**
 * waterfall, 管道式的传递返回值，作为下一个task的参数
 */

class SyncWaterfallHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    let [firstTask, ...other] = this.tasks
    other.reduce((ret, cur) => {
      return cur(ret)
    }, firstTask(...args))
  }
}

class Animal {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(['name'])
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