let instance

export class PlayerRepository {
  constructor () {
    if (instance) {
      return instance
    }

    this.players = []

    instance = this
  }

  register (player) {
    this.messages.push({id: uniqueId('message_'), text: message})
    window.setTimeout(() => { this.messages.pop() }, 4000)
  }
}
