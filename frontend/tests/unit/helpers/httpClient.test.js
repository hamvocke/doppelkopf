import { HttpClient } from "@/helpers/httpClient";
import fetchMock from "fetch-mock";

const http = new HttpClient();

describe("HTTP Client", () => {
  test("should load base url from config", () => {
    expect(http.baseUrl).toEqual("https://doppelkopf.ham.codes");
  });

  test("should perform get request", async () => {
    fetchMock.mock("https://doppelkopf.ham.codes/api", 200);
    const response = await http.get('/api')
    expect(response).toBeDefined();
  });
});
