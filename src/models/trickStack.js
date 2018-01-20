import { Trick } from '@/models/trick'

export class TrickStack {
  constructor (tricks = []) {
    this.tricks = tricks
  }

  add (trick) {
    if (!trick.isFinished()) {
      throw new Error('can not add an unfinished trick to the trick stack')
    }
    
    this.tricks.push(trick)
  }
}
