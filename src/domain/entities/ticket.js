class TicketEntity {
  constructor ({ subject, body, createdAt, status }) {
    this.slaHours = 24
    Object.assign(this, { subject, body, createdAt, status })
  }

  isLate () {
    const currentAt = Date.now()
    const millisecondsOfLate = 1000 * 60 * 60 * this.slaHours

    return (this.createdAt.valueOf() + millisecondsOfLate) <= currentAt
  }
}

module.exports = TicketEntity
