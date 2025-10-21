type Config = {
  test: ConfigValues;
  development: ConfigValues;
  production: ConfigValues;
};

type ConfigValues = {
  debug: boolean;
  testing: boolean;
  showAffinityDebugger: boolean;
};

const config: Config = {
  test: {
    debug: true,
    testing: true,
    showAffinityDebugger: false,
  },
  development: {
    debug: true,
    testing: false,
    showAffinityDebugger: false,
  },
  production: {
    debug: false,
    testing: false,
    showAffinityDebugger: false,
  },
};

function getConfig() {
  switch (process.env.NODE_ENV) {
    case "test":
      return config.test;
    case "development":
      return config.development;
    case "production":
      return config.production;
    default:
      return config.test;
  }
}

export const Config = getConfig();
