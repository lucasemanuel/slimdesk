const TicketStatus = require('./ticketStatus')

describe('Ticket Status', () => {
  test('should contain open status', () => {
    expect(TicketStatus.OPEN_STATUS).toBe('open_status')
  })
  test('should contain doing status', () => {
    expect(TicketStatus.DOING_STATUS).toBe('doing_status')
  })
  test('should contain resolved status', () => {
    expect(TicketStatus.RESOLVED_STATUS).toBe('resolved_status')
  })
  test('should contain late status', () => {
    expect(TicketStatus.LATE_STATUS).toBe('late_status')
  })
})
