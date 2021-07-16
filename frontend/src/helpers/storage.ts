import { Player } from "@/models/player";

const playerKey = "localPlayer";

export function savePlayer(player: Player) {
  const playerToSave: PersistedPlayer = {
    id: player.id,
    name: player.name
  };

  localStorage.setItem(playerKey, JSON.stringify(playerToSave));
}

export function loadPlayer() {
  const found = localStorage.getItem(playerKey);
  if (found) {
    const playerFromStorage: PersistedPlayer = JSON.parse(found);
    const player = new Player(playerFromStorage.name, true, true);
    player.id = playerFromStorage.id;
    return player;
  }

  const me = Player.me();
  savePlayer(me);
  return me;
}

export function dropPlayer() {
  localStorage.removeItem(playerKey);
}

type PersistedPlayer = {
  id: string;
  name: string;
};
