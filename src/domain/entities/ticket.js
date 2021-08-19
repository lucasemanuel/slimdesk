const Entity = require('./entity')
const TicketStatus = require('../constants/ticketStatus')

class TicketEntity extends Entity {
  constructor ({ id, subject, body, createdAt, status }) {
    super({ id })
    Object.assign(this, { subject, body, createdAt, status })
    this.slaHours = 24
    if (this.isLate()) {
      this.status = TicketStatus.LATE_STATUS
    }
  }

  isLate () {
    const currentDate = Date.now()
    const millisecondsLate = 1000 * 60 * 60 * this.slaHours
    const isLate = (this.createdAt.valueOf() + millisecondsLate) <= currentDate

    return isLate && this.status !== TicketStatus.RESOLVED_STATUS
  }
}

module.exports = TicketEntity
