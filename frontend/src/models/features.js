import { config } from "@/models/config";

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

export class FeatureManager {
  constructor(feature_api_url = null) {
    this.features = DEFAULT_FEATURES;
    this.api_url = config.backend_base_url + config.features_path;

    if (feature_api_url) {
      this.api_url = feature_api_url;
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
