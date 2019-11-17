import { config } from "@/models/config";

export class HttpClient {
  constructor() {
    this.baseUrl = config.backend_base_url;
  }
}
