import { Config } from "@/models/config";

export class HttpClient {
  constructor() {
    this.baseUrl = Config.backend_base_url;
  }

  async get(path) {
    return await fetch(this.baseUrl + path);
  }

  async post(path, data) {
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
