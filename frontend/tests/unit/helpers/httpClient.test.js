import { HttpClient } from "@/helpers/httpClient";
import fetchMock from "fetch-mock";

const http = new HttpClient();

describe("HTTP Client", () => {
  test("should load base url from config", () => {
    expect(http.baseUrl).toEqual("http://localhost:5000");
  });

  test("should perform get request", async () => {
    fetchMock.mock("http://localhost:5000/api", 200);
    const response = await http.get("/api");
    expect(response.status).toEqual(200);
  });
});
