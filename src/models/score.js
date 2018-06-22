export class Score {
  constructor (rePoints, kontraPoints) {
    this.rePoints = rePoints
    this.kontraPoints = kontraPoints
  }

  winner () {
    return this.rePoints > this.kontraPoints ? 'Re' : 'Kontra'
  }
}
