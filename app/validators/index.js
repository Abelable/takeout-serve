const { Rule, LinValidator } = require('@core/lin-validator-v2')

class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.code = [new Rule('isLength', '不允许为空', { min: 1 })]
  }
}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super()
    this.token = [new Rule('isLength', '不允许为空', { min: 1 })]
  }
}

module.exports = {
  TokenValidator,
  NotEmptyValidator
}
