import { Config } from "@/models/config";

/**
 * A simple client to send HTTP requests to the backend service.
 * All HTTP calls made in the client application should go through this client.
 * It's mostly a simple wrapper around the browser-native fetch API and offers
 * the additional benefit that it will prevent real HTTP requests from being
 * fired when running tests.
 */
export class WebsocketClient {
  constructor() {
    this.baseUrl = Config.backend_ws_base_url;
  }

  connect(payload) {
    return;
  }

  emit(eventName, payload) {
    if (Config.testing) {
      return;
    }
  }
}
