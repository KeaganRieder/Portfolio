import { useMemo, useState } from "react";

import { Application } from "../../components/application/application";
import type { ApplicationDefinition } from "../../components/application/definition";

import appIcon from "../../assets/apps/email.png";
import './email.css';

type Status = "idle" | "sending" | "sent" | "error";

export const Email: React.FC<ApplicationDefinition> = ({ info, visibilityControls, containers }) => {
    const formspreeId = useMemo(() => import.meta.env.VITE_FORMSPREE_FORM_ID?.trim(), []);

    const [fromEmail, setFromEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [botField, setBotField] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState<string | null>(null);

    const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (botField) {
            return;
        }

        if (!formspreeId) {
            setError("Form is not configured. Set VITE_FORMSPREE_FORM_ID.");
            return;
        }

        if (!isValidEmail(fromEmail)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!subject.trim() || !message.trim()) {
            setError("Subject and message are required.");
            return;
        }

        setError(null);
        setStatus("sending");

        try {
            const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email: fromEmail,
                    subject,
                    message,
                }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({} as { error?: string }));
                setError(body.error || "Something went wrong. Please try again.");
                setStatus("error");
                return;
            }

            setStatus("sent");
            setFromEmail("");
            setSubject("");
            setMessage("");
        } catch (err) {
            console.error(err);
            setError("Network error. Please try again.");
            setStatus("error");
        }
    };

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

    const bodyContent = () => {
        return (
            <form className="email-form" onSubmit={handleSubmit}>
                <label>
                    Your email
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={fromEmail}
                        onChange={(e) => setFromEmail(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Subject
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Message
                    <textarea
                        name="message"
                        placeholder="Write your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={6}
                    />
                </label>

                <input
                    type="text"
                    name="bot-field"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                    className="email-form__honeypot"
                    aria-hidden="true"
                    tabIndex={-1}
                />

                <button type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Send"}
                </button>

                {error && <p className="email-form__error">{error}</p>}
                {status === "sent" && <p className="email-form__success">Message sent. Thanks!</p>}
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