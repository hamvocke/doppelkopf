import { Config } from "@/models/config";

export class HttpClient {
  constructor() {
    this.baseUrl = Config.backend_base_url;
  }

  async get(path) {
    if (Config.testing) {
      return {ok: false};
    }
    return await fetch(this.baseUrl + path);
  }

  async post(path, data) {
    if (Config.testing) {
      return {ok: false};
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
