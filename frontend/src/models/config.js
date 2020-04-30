const config = {
  test: {
    baseUrl: "http://localhost:8080",
    backend_base_url: "http://localhost:5000",
    debug: true,
    testing: true
  },
  development: {
    baseUrl: "http://localhost:8080",
    backend_base_url: "http://localhost:5000",
    debug: true,
    testing: false
  },
  production: {
    baseUrl: "http://doppelkopf.ham.codes",
    backend_base_url: "https://doppelkopf.ham.codes",
    debug: false,
    testing: false
  }
};

export const Config = config[process.env.NODE_ENV];
