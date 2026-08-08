import type { AppRegistryEntry } from "../app_registry/appRegistry";
import { AboutMe } from "./aboutMe";
import textDocIcon from "../../assets/apps/icons/text_doc_icon.png";

export const AboutMeAppEntry: AppRegistryEntry = {
    id: "about_me",
    name: "About Me",
    icon: textDocIcon,
    component: AboutMe,
};
