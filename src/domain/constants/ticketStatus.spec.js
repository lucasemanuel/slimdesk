let TicketStatus = {
  OPEN_STATUS: 'open_status'
}

TicketStatus = Object.freeze(TicketStatus)

describe('Ticket Status', () => {
  test('should contain open status', () => {
    expect(TicketStatus.OPEN_STATUS).toBe('open_status')
  })
})
