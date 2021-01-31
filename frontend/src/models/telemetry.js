import { http } from "@/helpers/httpClient";

class TelemetryManager {
  constructor() {
  }

  newGame() {
    return http.post("/api/metrics/game/singleplayer/start");
  }

  win() {
    return http.post(`/api/metrics/game/singleplayer/win`);
  }

  lose() {
    return http.post(`/api/metrics/game/singleplayer/lose`);
  }
}

export const Telemetry = new TelemetryManager();
