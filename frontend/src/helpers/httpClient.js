import { Config } from "@/models/config";

export class HttpClient {
  constructor() {
    this.baseUrl = Config.backend_base_url;
  }

  async get(path) {
    return await fetch(this.baseUrl + path);
  }
}

export const http = new HttpClient();
