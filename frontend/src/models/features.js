import { http } from "@/helpers/httpClient";
import { Config } from "@/models/config"

export class Feature {
  constructor(name, enabled = false) {
    this.name = name;
    this.enabled = enabled;
  }
}

const DEFAULT_FEATURES = {
  show_tutorial_link: new Feature("Show link to tutorial", Config.debug)
};

class FeatureManager {
  constructor() {
    this.features = DEFAULT_FEATURES;
    this.getFromServer();
  }

  async getFromServer() {
    try {
      let response = await http.get("/api/features");
      this.features = await response.json();
    } catch (error) {
      this.features = DEFAULT_FEATURES;
    }
  }

  find(feature_name) {
    const feature = this.features[feature_name];
    if (!feature) {
      throw Error(`Cannot find feature with name "${feature_name}"`);
    }
    return feature;
  }
}

export const Features = new FeatureManager();
