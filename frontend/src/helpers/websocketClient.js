import { Config } from "@/models/config";

export class WebsocketClient {
  constructor() {
    this.baseUrl = Config.backend_base_url;
  }

  connect(payload) {}

  emit(eventName, payload) {
    if (Config.testing) {
      return;
    }
  }
}

export const websocket = new WebsocketClient();
