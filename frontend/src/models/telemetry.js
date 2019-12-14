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
    return http.post(`/api/game/${this.gameId}/win`);
  }

  lose() {
    return http.post(`/api/game/${this.gameId}/lose`);
  }
}

export const Telemetry = new TelemetryManager();
