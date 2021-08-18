let TicketStatus = {
  OPEN_STATUS: 'open_status',
  DOING_STATUS: 'doing_status',
  RESOLVED_STATUS: 'resolved_status',
  LATE_STATUS: 'late_status'
}

TicketStatus = Object.freeze(TicketStatus)

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
