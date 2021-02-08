import { websocket } from "@/helpers/websocketClient";
import { Config } from "@/models/config";
const fetchMock = require("fetch-mock-jest");

beforeEach(() => {
  fetchMock.reset();
});

describe("WebSocket Client", () => {
  test("should load base url from config", () => {
    expect(websocket.baseUrl).toEqual("http://localhost:5000");
  });
});
