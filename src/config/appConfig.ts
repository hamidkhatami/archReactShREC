// src/config/appConfig.ts
export interface AppConfig {
  API_BASE_URL: string;
  PORT: string;
  MAIN: string;
  VERSION: string;
  APP_NAME: string;
  ENV: string;
}

declare global {
  interface Window {
    __APP_CONFIG__?: AppConfig;
  }
}

export const getRuntimeConfig = (): AppConfig => {
  if (!window.__APP_CONFIG__) {
return {
      API_BASE_URL: "http://localhost",
      PORT: "8080",
      MAIN: "api",
      VERSION: "v1",
      APP_NAME: "csr",
      ENV: "local",
    };
  }
  return window.__APP_CONFIG__;
};
