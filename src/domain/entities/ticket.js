class TicketEntity {
  constructor ({ id, subject, body, createdAt, status }) {
    this.slaHours = 24
    Object.assign(this, { id, subject, body, createdAt, status })
  }

  isLate () {
    const currentDate = Date.now()
    const millisecondsLate = 1000 * 60 * 60 * this.slaHours

    return (this.createdAt.valueOf() + millisecondsLate) <= currentDate
  }
}

module.exports = TicketEntity
