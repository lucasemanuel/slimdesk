const uuid = require('uuid')

class GenerateId {
  static generate () {
    return uuid.v4()
  }
}

module.exports = GenerateId
