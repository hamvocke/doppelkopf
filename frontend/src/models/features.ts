import { http } from "@/helpers/httpClient";
import { Config } from "@/models/config";

const DEFAULT_FEATURES: Features = {
  enableTutorial: Config.debug,
  enableAnnouncements: true,
  enableMultiplayer: Config.debug
};

interface Features {
  enableTutorial: boolean;
  enableAnnouncements: boolean;
  enableMultiplayer: boolean;
}

class FeatureManager {
  features: Features | null = null;

  async fetch(): Promise<Features> {
    if (this.features) {
      return this.features;
    }

    try {
      let response = await http.get("/api/features");
      if (response.ok) {
        this.features = this.parseFeatures(await response.json());
      }
      return this.features ?? DEFAULT_FEATURES;
    } catch (error) {
      return DEFAULT_FEATURES;
    }
  }

  get() {
    return this.features || DEFAULT_FEATURES;
  }

  private parseFeatures(json: any): Features {
    return {
      enableAnnouncements: json["game.announcements.enable"] as boolean,
      enableMultiplayer: json["game.multiplayer.enable"] as boolean,
      enableTutorial: json["game.tutorial.enable"] as boolean
    };
  }
}

export const Features = new FeatureManager();
