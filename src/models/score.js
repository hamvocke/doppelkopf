export class Score {
  constructor (rePoints, kontraPoints) {
    if (rePoints + kontraPoints !== 240) {
      throw Error(`A score must have a total of 240 points. Got ${rePoints} for re, ${kontraPoints} for kontra`)
    }

    this.rePoints = rePoints
    this.kontraPoints = kontraPoints
  }

  winner () {
    return this.rePoints > this.kontraPoints ? 'Re' : 'Kontra'
  }
}
