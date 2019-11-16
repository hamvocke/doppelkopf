export class Feature {
  constructor(name, enabled = false) {
    this.name = name;
    this.enabled = enabled;
  }
}

class FeatureManager {
  constructor() {
    this.features = {
      a: new Feature("a", false),
      b: new Feature("b", false),
    };
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
