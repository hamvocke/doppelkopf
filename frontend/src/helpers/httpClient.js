import { Config } from "@/models/config";

/**
 * A simple client to send HTTP requests to the backend service.
 * All HTTP calls made in the client application should go through this client.
 * It's mostly a simple wrapper around the browser-native fetch API and offers
 * the additional benefit that it prevents real HTTP requests from being
 * fired when running tests.
 */
export class HttpClient {
  constructor() {
    this.baseUrl = Config.backend_base_url;
  }

  async get(path) {
    if (Config.testing) {
      return { ok: false };
    }
    return await fetch(this.baseUrl + path);
  }

  async post(path, data) {
    if (Config.testing) {
      return { ok: false };
    }
    let fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    return await fetch(this.baseUrl + path, fetchOptions);
  }
}

export const http = new HttpClient();
