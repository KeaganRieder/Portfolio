import type { AppRegistryEntry } from "@/system/registery/appRegistry";
import { AboutMe } from "./aboutMe";
import textDocIcon from "@/assets/icons/text_doc_icon.png";

/**
 * Registration record for the About Me app. appsEntries.ts auto-discovers
 * this file via import.meta.glob, so exporting an AppRegistryEntry here is
 * all that's needed to make the app appear as a desktop icon/window.
 */
export const AboutMeAppEntry: AppRegistryEntry = {
    id: "about_me",
    name: "About Me",
    icon: textDocIcon,
    component: AboutMe,
};
