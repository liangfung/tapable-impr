import { SyncHook } from 'tapable'

class Animal {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }

  tap() {
    this.hooks.arch.tap('cat', (name) => {
      console.log('cat' + name)
    })
  }

  start(...arg) {
    this.hooks.arch.call(...arg)
  }
}

let cat = new Animal()

cat.tap()
cat.start('kiti')