import { http } from "@/helpers/httpClient";

class TelemetryManager {
  constructor() {
    this.gameId = undefined;
  }

  async newGame() {
    this.gameId = undefined;

    try {
        const response = await http.post("/api/game/new");
        if (response.ok) {
          const json = await response.json();
          this.gameId = json.id;
        }
    } catch(error) {
        console.error(error);
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
