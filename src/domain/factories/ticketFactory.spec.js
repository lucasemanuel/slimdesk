const TicketEntity = require('../entities/ticket')
const TicketStatus = require('../constants/ticketStatus')

class TicketFactory {
  build ({ id, subject, body, createdAt = new Date(), status }) {
    status = status ?? TicketStatus.OPEN_STATUS
    return new TicketEntity({ id, subject, body, createdAt, status })
  }
}

describe('Ticket Factory', () => {
  test('should return a TicketEntity object', () => {
    const currentDate = new Date()
    const data = {
      subject: 'any_subject',
      body: 'any_body',
      status: 'any_status'
    }
    const sut = new TicketFactory()
    const ticket = sut.build(data)
    expect(ticket).toBeInstanceOf(TicketEntity)
    expect(ticket).toEqual(expect.objectContaining({
      id: undefined,
      body: 'any_body',
      subject: 'any_subject',
      createdAt: currentDate,
      status: 'any_status'
    }))
  })
  test('should return a TicketEntity object with open_status if pass status like undefined', () => {
    const data = {
      subject: 'any_subject',
      body: 'any_body'
    }
    const sut = new TicketFactory()
    const ticket = sut.build(data)
    expect(ticket.status).toBe(TicketStatus.OPEN_STATUS)
  })
})
