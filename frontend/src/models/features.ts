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

export let features: Features;

export async function fetch(): Promise<Features> {
  if (features) {
    return features;
  }

  try {
    let response = await http.get("/api/features");
    if (response.ok) {
      features = parseFeatures(await response.json());
    }
    return features ?? DEFAULT_FEATURES;
  } catch (error) {
    return DEFAULT_FEATURES;
  }
}

function parseFeatures(json: any): Features {
  return {
    enableAnnouncements: json["game.announcements.enable"] as boolean,
    enableMultiplayer: json["game.multiplayer.enable"] as boolean,
    enableTutorial: json["game.tutorial.enable"] as boolean
  };
}
