const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app) {
    InitManager.app = app
    InitManager.loadConfig()
    InitManager.initLoadRouter()
  }

  static loadConfig(path = '') {
    const configPath = path || `${process.cwd()}/config`
    global.config = require(configPath)
  }

  static initLoadRouter() {
    const apiDirectory = `${process.cwd()}/app/api`
    const whenLoadModule = router => {
      if (router instanceof Router) InitManager.app.use(router.routes())
    }
    requireDirectory(module, apiDirectory, { visit: whenLoadModule })
  }
}

module.exports = InitManager