export class Affinities {
  constructor(me, players) {
    this.me = me;
    players.array.forEach(player => {
      if (mePlayer.id !== player.id) {
        this.players.push({ player, affinity: 0 });
      }
    });
  }

  announcementMade(player) {
    if (this._isMyPartyMember(player)) {
      this.players.forEach(element => {
        this.setPlayerAffinityByParty(element.player);
      });
    } else {
      this.setPlayerAffinityByParty(player);
    }
  }

  getPlayerAffinityValue(player) {
    return this.players.find(element => element.player.id === player.id)
      .affinity;
  }

  setPlayerAffinityToValue(player, value) {
    let index = this.players.findIndex(
      element => element.player.id === player.id
    );
    this.players[index].affinity = value;
  }

  setPlayerAffinityByParty(player) {
    let index = this.players.findIndex(
      element => element.player.id === player.id
    );
    this.players[index].affinity = this._isMyPartyMember(player) ? 1 : -1;
  }

  /* ToDo replace with # in future version for a private function
   * this function would actually solve the affinity problem,
   * hence it shouldn't be able to be called outside the class.
   */
  _isMyPartyMember(player) {
    return (
      this.me.isRe() === player.isRe() ||
      this.me.isKontra() === player.isKontra()
    );
  }
}
