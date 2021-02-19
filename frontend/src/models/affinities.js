export const affinityEvents = {
  announcement: "announcement",
  queen_of_clubs: "queen_of_clubs",
  played_card: "played_card"
};

/**
 * Affinities express the relationship between players. Each player has
 * a certain affinity for each other player. Two players could be partners
 * if they are in the same party, or they could be opponents if they are in
 * different parties. If no player made any announcements or played a
 * queen of clubs yet, players won't know who's playing in the same party.
 * Some other events in the game could make a player believe that it's more likely
 * that other players play in the same party without knowing it for sure.
 *
 * All this information is captured in this Affinities class. An affinity between
 * two players ranges from
 * -1 (it's clear that they're playing in different parties), over
 *  0 (it's completely unknown if they're playing together or not) to
 * +1 (it's clear that they're playing in the same party)
 * and it can take any value in between to track suspected affinities
 * (e.g. if a player plays a high value card when a trick is goign to another player).
 *
 * The information which players are in the same party is asymmetric
 * - not all players share the same knowledge.
 * Certain events allow some players to deduct more information about
 * affinities while others can only make few safe assumptions.
 *
 * Consider this example:
 * Player 1 (P1) and Player 3 (P3) are re
 * P2 and P4 are kontra
 *
 * P3 opens the game by playing the queen of clubs.
 *
 * The affinities between players will now look like this:
 *
 * |    | P1 | P2 | P3 | P4 |
 * | P1 |  * | -1 | +1 | -1 |
 * | P2 |  0 |  * | -1 |  0 |
 * | P3 |  0 |  0 |  * |  0 |
 * | P4 |  0 |  0 | -1 |  * |
 *
 * (a * marks "is the same player", effectively this will have a value of 0)
 */
export class Affinities {
  constructor(me, players = []) {
    this.me = me;
    this.setPlayers(players);
  }

  setPlayers(players) {
    this.affinityTable = players
      .filter(player => player.id !== this.me.id)
      .map(player => ({ player, affinity: 0 }));
  }

  declaresParty(player) {
    if (this._isMyPartyMember(player)) {
      this.affinityTable.forEach(x => {
        this.setPlayerAffinityByParty(x.player);
      });
    } else {
      this.setPlayerAffinityByParty(player);
    }
  }

  for(player) {
    return !this._isMe(player)
      ? this.affinityTable.find(x => x.player.id === player.id).affinity
      : 0;
  }

  setPlayerAffinityToValue(player, value) {
    if (!this._isMe(player)) {
      let index = this.affinityTable.findIndex(x => x.player.id === player.id);
      this.affinityTable[index].affinity = value;
    }
  }

  setPlayerAffinityByParty(player) {
    if (!this._isMe(player)) {
      let index = this.affinityTable.findIndex(x => x.player.id === player.id);
      this.affinityTable[index].affinity = this._isMyPartyMember(player)
        ? 1
        : -1;
    }
  }

  reset() {
    this.affinityTable.forEach(x => (x.value = 0));
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
