const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('@validator')
const { Auth } = require('@middlewares/auth')
const { WXManager } = require('@services/wx')
const { successResponse } = require('@lib/helper')

const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx)
  const { code } = v.get('body')
  const token = await WXManager.codeToToken(code)
  successResponse({ ctx, status: 200, data: { token } })
})

router.post('/verify', async (ctx, next) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const res = Auth.verifyToken(v.get('body.token'))
  successResponse({ ctx, data: { is_valid: res } })
})

module.exports = router
