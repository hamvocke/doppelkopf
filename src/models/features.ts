import { Config } from "@/models/config";

export const Features: Features = {
  enableTutorial: Config.debug,
  enableAnnouncements: true,
};

interface Features {
  enableTutorial: boolean;
  enableAnnouncements: boolean;
}
