import { http } from "@/helpers/httpClient";

class TelemetryManager {
  constructor() {
    this.gameId = undefined;
  }

  async newGame() {
    this.gameId = undefined;
    const response = await http.post("/api/game/new");
    if (response.ok) {
      const json = await response.json();
      this.gameId = json.id;
    }
  }

  win() {
    const payload = {
      gameId: this.gameId
    };
    return http.post("/api/game/win", payload);
  }
}

export const Telemetry = new TelemetryManager();
