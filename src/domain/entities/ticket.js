const Entity = require('./entity')
const {
  DOING_STATUS,
  LATE_STATUS,
  OPEN_STATUS,
  RESOLVED_STATUS
} = require('../constants/ticketStatus')
const DomainError = require('../errors/domainError')

class TicketEntity extends Entity {
  constructor ({ id, subject, body, createdAt, status }) {
    super({ id })
    Object.assign(this, { subject, body, createdAt, status })
    if (this.isLate()) {
      this.status = LATE_STATUS
    }
    Object.freeze(this)
  }

  static create ({ id, subject, body, createdAt = new Date(), status = OPEN_STATUS }) {
    if (
      status !== OPEN_STATUS &&
      status !== LATE_STATUS &&
      status !== RESOLVED_STATUS &&
      status !== DOING_STATUS) {
      throw new DomainError('status')
    }
    const ticket = new TicketEntity({ id, subject, body, createdAt, status })
    return ticket
  }

  get slaHours () {
    return 24
  }

  isLate () {
    const currentDate = Date.now()
    const millisecondsLate = 1000 * 60 * 60 * this.slaHours
    const isLate = (this.createdAt.valueOf() + millisecondsLate) <= currentDate

    return isLate && this.status !== RESOLVED_STATUS
  }
}

module.exports = TicketEntity
