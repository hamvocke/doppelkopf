type Config = {
  test: ConfigValues;
  development: ConfigValues;
  production: ConfigValues;
};

type ConfigValues = {
  base_url: string;
  backend_base_url: string;
  backend_ws_base_url: string;
  debug: boolean;
  testing: boolean;
};

const config: Config = {
  test: {
    base_url: "http://localhost:8080",
    backend_base_url: "http://localhost:5000",
    backend_ws_base_url: "ws://localhost:5000",
    debug: true,
    testing: true,
  },
  development: {
    base_url: "http://localhost:8080",
    backend_base_url: "http://localhost:5000",
    backend_ws_base_url: "ws://localhost:5000",
    debug: true,
    testing: false,
  },
  production: {
    base_url: "https://doppelkopf.ham.codes",
    backend_base_url: "https://doppelkopf.ham.codes",
    backend_ws_base_url: "wss://doppelkopf.ham.codes",
    debug: false,
    testing: false,
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
