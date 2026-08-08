import type { AppRegistryEntry } from "../app_registry/appRegistry";
import { Email } from "./email";
import mailIcon from "../../assets/apps/icons/mail_icon.png";

export const EmailAppEntry: AppRegistryEntry = {
    id: "email",
    name: "Email",
    icon: mailIcon,
    component: Email,
};
