export class RingQueue {
  constructor (elements) {
    this.elements = elements
    this.currentIndex = 0
  }

  length () {
    return this.elements.length
  }

  next () {
    return this.elements[this.currentIndex++ % this.elements.length]
  }
}
