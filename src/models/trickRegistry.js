export class TrickRegistry {
  constructor () {
    this.currentTrick = undefined
  }

  add (trick) {
    this.currentTrick = trick
  }

  current () {
    return this.currentTrick
  }
}

export const trickRegistry = new TrickRegistry()
