let instance

export class Notifier {
  constructor () {
    if (instance) {
      return instance
    }

    this.messages = []

    instance = this
  }

  info (message) {
    this.messages.push(message)
  }
}
