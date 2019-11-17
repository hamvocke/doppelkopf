import { HttpClient } from "@/helpers/httpClient";

describe("HTTP Client", () => {
  test("should load base url from config", () => {
    const http = new HttpClient();
    expect(http.baseUrl).toEqual("https://doppelkopf.ham.codes");
  });
});
