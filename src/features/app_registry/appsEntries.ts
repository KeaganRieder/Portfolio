import type { AppRegistryEntry } from "./appRegistry";

// Auto-discovers any `appEntry.ts` file living one level up (e.g. src/features/about_me/appEntry.ts).
// Adding a new app to the site requires no edits here - just drop an appEntry.ts in the app's folder.
const appModules = import.meta.glob("../*/appEntry.ts", { eager: true });

export const AppsEntries: AppRegistryEntry[] = Object.values(appModules).flatMap((mod) =>
    Object.values(mod as Record<string, AppRegistryEntry>)
);
