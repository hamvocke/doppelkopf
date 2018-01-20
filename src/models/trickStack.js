import { Trick } from '@/models/trick'

export class TrickStack {
  constructor (tricks = []) {
    this.tricks = tricks
  }

  add (trick) {
    this.tricks.push(trick)
  }
}
