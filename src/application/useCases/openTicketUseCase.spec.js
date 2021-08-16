const { MissingParamError } = require('../../utils/errors')

class OpenTicketUseCase {
  async execute ({ body, subject }) {
    this.validate({ body, subject })
  }

  validate ({ body, subject }) {
    if (!subject) {
      throw new MissingParamError('subject')
    } else if (!body) {
      throw new MissingParamError('body')
    }
  }
}

describe('Open Ticket Use Case', () => {
  test('should throw an error if is not provided subject', () => {
    console.log(MissingParamError)
    const sut = new OpenTicketUseCase()
    const promise = sut.execute({ body: 'any_body' })
    expect(promise).rejects.toThrow(new MissingParamError('subject'))
  })
  test('should throw an error if is not provided body', () => {
    const sut = new OpenTicketUseCase()
    const promise = sut.execute({ subject: 'any_subject' })
    expect(promise).rejects.toThrow(new MissingParamError('body'))
  })
  test.skip('should throw an error if TicketRepository is invalid', () => {
    const sut = new OpenTicketUseCase()
    const promise = sut.execute({ subject: 'any_subject', body: 'any_body' })
    expect(promise).rejects.toThrow()
  })
})
