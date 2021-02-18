import { http } from "@/helpers/httpClient";
import { Config } from "@/models/config";

const DEFAULT_FEATURES = {
  "game.tutorial.enable": Config.debug,
  "game.announcements.enable": true,
  "game.multiplayer.enable": Config.debug
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
      if (response.ok) {
        this.features = (await response.json()).features;
      }
      return this.features;
    } catch (error) {
      return DEFAULT_FEATURES;
    }
  }

  get(feature_name) {
    const features = this.features || DEFAULT_FEATURES;
    const feature = features[feature_name];
    if (feature === undefined) {
      throw Error(`Cannot find feature with name "${feature_name}"`);
    }
    return feature;
  }
}

export const Features = new FeatureManager();
