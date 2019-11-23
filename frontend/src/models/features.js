import { http } from "@/helpers/httpClient";

export class Feature {
  constructor(name, enabled = false) {
    this.name = name;
    this.enabled = enabled;
  }
}

const DEFAULT_FEATURES = {
  a: new Feature("a", false),
  b: new Feature("b", false)
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
      // throw new Error("Fetching features failed, using default features");
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
