import { http } from "@/helpers/httpClient";

class TelemetryManager {
  constructor() {}

  async newGame() {
    let response = await http.post("/api/game/new");
    if (response.ok) {
      let json = await response.json();
      return json.id;
    }
    return -1;
  }
}

export const Telemetry = new TelemetryManager();
