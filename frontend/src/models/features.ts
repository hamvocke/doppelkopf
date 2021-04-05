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
  private features: Features | null = null;

  async fetch(): Promise<Features> {
    try {
      let response = await http.get("/api/features");
      if (response.ok && response.status < 300) {
        this.features = this.parseFeatures(await response.json());
      }
      return this.features ?? DEFAULT_FEATURES;
    } catch (error) {
      return DEFAULT_FEATURES;
    }
  }

  reset() {
    this.features = null;
  }

  get(): Features {
    return this.features || DEFAULT_FEATURES;
  }

  private parseFeatures(json: any): Features {
    const f = json["features"];
    return {
      enableAnnouncements: f["game.announcements.enable"] as boolean,
      enableMultiplayer: f["game.multiplayer.enable"] as boolean,
      enableTutorial: f["game.tutorial.enable"] as boolean
    };
  }
}

export const Features = new FeatureManager();
