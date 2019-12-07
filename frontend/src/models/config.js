const config = {
  test: {
    backend_base_url: "http://localhost:5000",
    debug: true,
    testing: true,
  },
  development: {
    backend_base_url: "http://localhost:5000",
    debug: true,
    testing: false,
  },
  production: {
    backend_base_url: "https://doppelkopf.ham.codes",
    debug: false,
    testing: false,
  }
};

export const Config = config[process.env.NODE_ENV];
