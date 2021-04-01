const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class User extends Model {
  static async registerByOpenid(openid) {
    return await User.create({ openid })
  }

  static async getUserByOpenid(openid) {
    return await User.findOne({ where: { openid } })
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    avatar: Sequelize.STRING,
    nickname: Sequelize.STRING,
    tel: {
      type: Sequelize.STRING,
      unique: true
    },
    openid: {
      type: Sequelize.STRING,
      unique: true
    }
  }, 
  { 
    sequelize, 
    tableName: 'user' 
  }
)

module.exports = { User }
