import { http } from "@/helpers/httpClient";

class TelemetryManager {
  constructor() {
    this.gameId = undefined;
  }

  async newGame() {
    this.gameId = undefined;
    let response = await http.post("/api/game/new");
    if (response.ok) {
      let json = await response.json();
      this.gameId = json.id;
    }
  }
}

export const Telemetry = new TelemetryManager();
