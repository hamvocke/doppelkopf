import { Config } from "@/models/config";

class StubResponse {
  ok = false;
  status = 418;
  json = () => null;
}

/**
 * A simple client to send HTTP requests to the backend service.
 * All HTTP calls made in the client application should go through this client.
 * It's mostly a simple wrapper around the browser-native fetch API and offers
 * the additional benefit that it prevents real HTTP requests from being
 * fired when running tests.
 */
export class HttpClient {
  baseUrl: string = Config.backend_base_url;

  async get(path: string): Promise<Response | StubResponse> {
    if (Config.testing) {
      return new StubResponse();
    }

    return await fetch(this.baseUrl + path);
  }

  async post(
    path: string,
    data: object | null = null
  ): Promise<Response | StubResponse> {
    if (Config.testing) {
      return new StubResponse();
    }

    let fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    };
    return await fetch(this.baseUrl + path, fetchOptions);
  }
}

export const http = new HttpClient();
