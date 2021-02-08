import { websocket } from "@/helpers/websocketClient";
import { Config } from "@/models/config";

Config.testing = true;

beforeEach(() => {});

describe("WebSocket Client", () => {
  test("should load base url from config", () => {
    expect(websocket.baseUrl).toEqual("ws://localhost:5000");
  });
});
