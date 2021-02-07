export const affinityEvents = {
  announcement: "announcement",
  queen_of_clubs: "queen_of_clubs",
  played_card: "played_card"
};

export class Affinities {
  constructor(me, players = []) {
    this.me = me;
    this.setPlayers(players);
  }

  setPlayers(players) {
    this.players = [];
    players.forEach(player => {
      if (this.me.id !== player.id) {
        this.players.push({ player, affinity: 0 });
      }
    });
  }

  declaresParty(player) {
    if (this._isMyPartyMember(player)) {
      this.players.forEach(element => {
        this.setPlayerAffinityByParty(element.player);
      });
    } else {
      this.setPlayerAffinityByParty(player);
    }
  }

  getPlayerAffinityValue(player) {
    return !this._isMe(player)
      ? this.players.find(element => element.player.id === player.id).affinity
      : 0;
  }

  setPlayerAffinityToValue(player, value) {
    if (!this._isMe(player)) {
      let index = this.players.findIndex(
        element => element.player.id === player.id
      );
      this.players[index].affinity = value;
    }
  }

  setPlayerAffinityByParty(player) {
    if (!this._isMe(player)) {
      let index = this.players.findIndex(
        element => element.player.id === player.id
      );
      this.players[index].affinity = this._isMyPartyMember(player) ? 1 : -1;
    }
  }

  reset() {
    this.players.forEach(element => (element.value = 0));
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

  _isMe(player) {
    return this.me.id === player.id;
  }
}
