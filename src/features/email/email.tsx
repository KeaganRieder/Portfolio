import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import emailjs from "@emailjs/browser";

import { Application } from "../../components/application/application";
import type { ApplicationDefinition } from "../../components/application/definition";

import appIcon from "../../assets/apps/icons/mail_icon.png";
import './email.css';

export const Email: React.FC<ApplicationDefinition> = ({ info, visibilityControls, containers }) => {

    const [fromName, setFromName] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [botField, setBotField] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function sendEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (botField.trim()) {
            return; // honeypot hit, silently drop
        }

        setStatus("sending");
        setErrorMessage(null);

        emailjs
            .send(
                "service_03llsmt", // service ID
                "template_5gofbsm", // template ID
                {
                    from_name: fromName,
                    subject: subject,
                    html_message: message,
                    email: fromEmail,
                    from_email: fromEmail,
                },
                {
                    publicKey: "9mZC9jnKS9MX49n_i", // public key
                }
            )
            .then(() => {
                setStatus("sent");
                setFromName("");
                setFromEmail("");
                setSubject("");
                setMessage("");
            })
            .catch((error) => {
                console.error("EmailJS error", error);
                setErrorMessage("Something went wrong. Please try again.");
                setStatus("error");
            });
    }

    const shortcut = () => {
        return {
            desktop: {
                id: info.id + "_shortcut",
                appName: info.appName,
                iconPath: appIcon,
            },
            taskbar: {
                id: info.id + "_shortcut",
                appName: info.appName,
                iconPath: appIcon,
            },
        };
    };

    const bodySection = (
        header: string,
        type: string,
        name: string,
        placeholder: string,
        value: string,
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    ) => {
        return (
            <label>
                <h4>{header}:</h4>
                {name === "html_message" ? (
                    <textarea className="input-field"
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        required
                        rows={6}
                    />
                ) : (
                    <input className="input-field"
                        type={type}
                        name={name}
                        autoComplete={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        required
                    />
                )}
            </label>
        );
    };

    const bodyContent = () => {
        return (
            <form className="email-form" onSubmit={sendEmail}>
                <input
                    type="text"
                    name="website" // honeypot for bots
                    tabIndex={-1}
                    autoComplete="off"
                    className="email-form__honeypot"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                />
                {bodySection("Your name", "text", "from_name", "Your name", fromName, (e) => setFromName(e.target.value))}
                {bodySection("Your email", "email", "from_email", "you@example.com", fromEmail, (e) => setFromEmail(e.target.value))}
                {bodySection("Subject", "text", "subject", "Subject", subject, (e) => setSubject(e.target.value))}
                {bodySection("Message", "text", "html_message", "Your message here...", message, (e) => setMessage(e.target.value))}

                <button type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Send"}
                </button>

                {errorMessage && <p className="email-form__error">{errorMessage}</p>}
            </form>
        );
    };

    return (
        <Application
            info={info}
            visibilityControls={visibilityControls}
            containers={containers}
            shortcuts={shortcut()}
            content={{ body: bodyContent() }}
        />
    );
};