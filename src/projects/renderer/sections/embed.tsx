import './embed.css';

export interface EmbedSectionProps {
    src: string;
    title: string;
    height?: number;
    sandbox?: string;
    styleOverride?: string;
}

/** Embeds another live site (e.g. a hosted game) directly in a project window.
 *  Sandboxed by default since it's loading a separate origin, even one you
 *  control - keeps the iframe from doing anything unexpected to the parent
 *  page. Drop `allow-same-origin` from the default sandbox if the embedded
 *  page needs localStorage/cookies (e.g. saving high scores) and you trust it. */
export const EmbedSection: React.FC<EmbedSectionProps> = ({
    src,
    title,
    height = 600,
    sandbox = "allow-scripts allow-same-origin allow-pointer-lock",
    styleOverride,
}) => {
    return (
        <div className={`project-embed ${styleOverride ?? ''}`} style={{ height }}>
            <iframe
                src={src}
                title={title}
                loading="lazy"
                sandbox={sandbox}
                referrerPolicy="no-referrer"
            />
        </div>
    );
};
