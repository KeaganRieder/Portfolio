import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import emailjs from "@emailjs/browser";

import { Application } from "@/system/window/application";
import type { ApplicationDefinition } from "@/system/window/types";

import './email.css';

/**
 * "Email" desktop app: a contact form that sends messages directly from
 * the browser via EmailJS (no backend server), with a honeypot field for
 * basic bot protection and inline send/error status feedback.
 */
export const Email: React.FC<ApplicationDefinition> = ({ info, visibilityControls, containers, shortcuts }) => {

    const [fromName, setFromName] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [botField, setBotField] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Submits the form via EmailJS. Silently aborts if the honeypot field was
    // filled in (a real user would never see or fill it), which drops bot submissions.
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

    // Renders one labeled form field; switches between a <textarea> (for the
    // message body) and a plain <input> for everything else.
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

    // Full form body: honeypot field, name/email/subject/message inputs, and the submit button.
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
            shortcuts={shortcuts}
            content={{ body: bodyContent() }}
        />
    );
};
