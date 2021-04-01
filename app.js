const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const InitManager = require('./core/init')

const app = new Koa()
app.use(bodyParser())
InitManager.initCore(app)

app.listen(3000)