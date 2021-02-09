import { WebsocketClient } from "@/helpers/websocketClient";
import { Config } from "@/models/config";

Config.testing = true;

describe("WebSocket Client", () => {
  test("should load base url from config", () => {
    const websocket = new WebsocketClient();
    expect(websocket.baseUrl).toEqual("ws://localhost:5000");
  });
});
