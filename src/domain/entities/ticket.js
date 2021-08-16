const Entity = require('./entity')

class TicketEntity extends Entity {
  constructor ({ id, subject, body, createdAt, status }) {
    super({ id })
    Object.assign(this, { subject, body, createdAt, status })
    this.slaHours = 24
  }

  isLate () {
    const currentDate = Date.now()
    const millisecondsLate = 1000 * 60 * 60 * this.slaHours

    return (this.createdAt.valueOf() + millisecondsLate) <= currentDate
  }
}

module.exports = TicketEntity
