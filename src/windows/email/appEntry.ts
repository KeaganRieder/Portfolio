import type { AppRegistryEntry } from "@/system/registery/appRegistry";
import { Email } from "./email";
import mailIcon from "@/assets/icons/mail_icon.png";

/**
 * Registration record for the Email app. appsEntries.ts auto-discovers
 * this file via import.meta.glob, so exporting an AppRegistryEntry here is
 * all that's needed to make the app appear as a desktop icon/window.
 */
export const EmailAppEntry: AppRegistryEntry = {
    id: "email",
    name: "Email",
    icon: mailIcon,
    component: Email,
};
