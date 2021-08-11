import { Player } from "@/models/player";

export enum AffinityEvent {
  Announcement = "announcement",
  QueenOfClubs = "queen_of_clubs",
  PlayedCard = "played_card"
}

/**
 * Represents the affinities for a single player for all other players\
 * in the game.
 *
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
 * The affinities between all players will now look like this:
 *
 * |    | P1 | P2 | P3 | P4 |
 * | P1 |  * | -1 | +1 | -1 |
 * | P2 |  0 |  * | -1 |  0 |
 * | P3 |  0 |  0 |  * |  0 |
 * | P4 |  0 |  0 | -1 |  * |
 *
 * (a * marks "is the same player", effectively this will have a value of 0)
 * A single "Affinities" instance corresponds to one row in the table above.
 * i.e. P1's affinities for all other players are shown in the first row.
 */

interface PlayerAffinity {
  player: Player;
  affinity: number;
}

export class Affinities {
  me: Player;
  affinityTable: PlayerAffinity[] = [];

  constructor(me: Player) {
    this.me = me;
    this.setPlayers([]);
  }

  setPlayers(allPlayers: Player[]) {
    this.affinityTable = allPlayers
      .filter(player => player.id !== this.me.id)
      .map(player => ({ player: player, affinity: 0 }));
  }

  declaresParty(player: Player) {
    if (this.isInMyParty(player)) {
      this.affinityTable.forEach(x => {
        this.setAffinity(x.player, this.isInMyParty(x.player) ? 1 : -1);
      });
    } else {
      this.setAffinity(player, -1);
    }
  }

  for(player: Player) {
    return this.affinityTable.find(x => x.player.id === player.id)?.affinity;
  }

  setAffinity(player: Player, value: number) {
    if (!this.isMe(player)) {
      let index = this.affinityTable.findIndex(x => x.player.id === player.id);
      this.affinityTable[index].affinity = value;
    }
  }

  reset() {
    this.affinityTable.forEach(x => (x.affinity = 0));
  }

  private isInMyParty(player: Player) {
    return this.me.isRe() === player.isRe();
  }

  private isMe(player: Player) {
    return this.me.id === player.id;
  }
}
