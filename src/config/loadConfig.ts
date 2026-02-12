import { AppConfig } from "@/config/appConfig";

export async function loadConfig(): Promise<void> {
  const res = await fetch("/config.json");
  if (!res.ok) throw new Error("Cannot load config.json");

  const config: AppConfig = await res.json();
  window.__APP_CONFIG__ = config;
  console.log("Config loaded:", config);
}
