const config = {
  test: {
    backend_base_url: "http://localhost:5000",
    debug: true
  },
  development: {
    backend_base_url: "http://localhost:5000",
    debug: true
  },
  production: {
    backend_base_url: "https://doppelkopf.ham.codes",
    debug: false
  }
};

export const Config = config[process.env.NODE_ENV];
