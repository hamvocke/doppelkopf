const config = {
  test: {
    backend_base_url: "http://localhost:5000"
  },
  development: {
    backend_base_url: "http://localhost:5000"
  },
  production: {
    backend_base_url: "https://doppelkopf.ham.codes"
  }
};

export const Config = config[process.env.NODE_ENV];
