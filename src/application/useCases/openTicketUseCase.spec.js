class OpenTicketUseCase {
  async execute () {
    throw new Error()
  }
}

describe('Open Ticket Use Case', () => {
  test('should throw an error if is not provided subject', () => {
    const sut = new OpenTicketUseCase()
    const promise = sut.execute({ body: '' })
    expect(promise).rejects.toThrow()
  })
  test('should throw an error if is not provided body', () => {
    const sut = new OpenTicketUseCase()
    const promise = sut.execute({ subject: '' })
    expect(promise).rejects.toThrow()
  })
})
