import { http } from "@/helpers/httpClient";
import { Config } from "@/models/config";

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
    this.features = undefined;
  }

  async fetch() {
    if (this.features) {
      return this.features;
    }

    try {
      let response = await http.get("/api/features");
      this.features = await response.json();
      return this.features;
    } catch (error) {
      return DEFAULT_FEATURES;
    }
  }

  async get(feature_name) {
    const features = await this.fetch();
    const feature = features[feature_name];
    if (!feature) {
      throw Error(`Cannot find feature with name "${feature_name}"`);
    }
    return feature;
  }
}

export const Features = new FeatureManager();
