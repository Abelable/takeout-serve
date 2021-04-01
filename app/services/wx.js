const util = require('util')
const axios = require('axios')
const { User } = require('@models/user')
const { Auth } = require('@middlewares/auth')
const { AuthFailed } = require('@core/http-exception')
const { generateToken } = require('@core/util')

class WXManager {
  static async codeToToken(code) {
    const { loginUrl, appId, appSecret } = global.config.wx
    const url = util.format(loginUrl, appId, appSecret, code)
    const res = await axios.get(url)
    if (res.status !== 200) throw new AuthFailed('openid获取失败')
    const { errcode, errmsg } = res
    if (errcode) throw new AuthFailed(`openid获取失败, errmsg: ${errmsg}`)

    const { openid } = res.data
    let user = await User.getUserByOpenid(openid)
    if (!user) user = await User.registerByOpenid(openid)
    
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManager
}
