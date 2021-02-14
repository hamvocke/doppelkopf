import { Config } from "@/models/config";
import { io } from "socket.io-client";

/**
 * A simple client to manage websocket connections with the backend service.
 * All websocket events sent from the client application should go through this client.
 * It's a primitive wrapper around Socket.IO that prevents establishing real connections
 * and emitting real websocket events during testing.
 */
export class WebsocketClient {
  constructor() {
    this.baseUrl = Config.backend_ws_base_url;
    this.socket = null;
  }

  connect() {
    if (Config.testing) {
      return;
    }

    this.socket = io(this.baseUrl);
  }

  emit(eventName, payload) {
    if (Config.testing) {
      return;
    }
  }
}
