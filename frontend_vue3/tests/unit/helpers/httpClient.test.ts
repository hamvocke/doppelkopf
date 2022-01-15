import { http } from "@/helpers/httpClient";
import { Config } from "@/models/config";

Config.testing = false; // make httpClient fire "real" requests so it's hitting fetch

function mockFetch(data: {}, ok = true, status = 200) {
  return jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({ ok: ok, status: status, json: () => data })
    );
}

describe("HTTP Client", () => {
  test("should load base url from config", () => {
    expect(http.baseUrl).toEqual("http://localhost:5000");
  });

  test("should perform get request", async () => {
    window.fetch = mockFetch({}, true, 200);
    const response = await http.get("/api");
    expect(response.status).toEqual(200);
  });

  test("should perform post request", async () => {
    window.fetch = mockFetch({ some: "data" }, true, 200);
    const response = await http.post("/api", { input: "data" });
    const responseBody = await response.json();
    expect(response.status).toEqual(200);
    expect(responseBody).toEqual({ some: "data" });
  });
});
