export class RingQueue {
  constructor(elements) {
    this.elements = elements;
    this.currentIndex = 0;
  }

  length() {
    return this.elements.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.elements.length;
    return this.elements[this.currentIndex];
  }

  current() {
    return this.elements[this.currentIndex];
  }

  prioritize(element) {
    const foundIndex = this.elements.indexOf(element);

    if (foundIndex === -1) {
      throw new Error(`can't prioritize unknown element '${element}'`);
    }

    this.currentIndex = foundIndex;
  }

  first() {
    return this.current();
  }

  second() {
    return this.elements[(this.currentIndex + 1) % this.elements.length];
  }

  third() {
    return this.elements[(this.currentIndex + 2) % this.elements.length];
  }

  fourth() {
    return this.elements[(this.currentIndex + 3) % this.elements.length];
  }
}
