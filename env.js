import Constants from "expo-constants";

const ENV = {
  dev: {
    apiBaseUrl: "http://192.168.1.34:3000",
  },
  staging: {
    apiBaseUrl: "https://staging-api.yourapp.com",
  },
  prod: {
    apiBaseUrl: "https://api.yourapp.com",
  },
};

const getEnvVars = (env = Constants.expoConfig.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;
