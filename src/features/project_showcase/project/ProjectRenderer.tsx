import type { SectionType } from "../../../types/sectionType";

export const ProjectRenderer = (content?: { sectionInfo: SectionType; styleName?: string; }[]) => {
    if (!content) return null;

    return (
        <>
            {content.map(({ sectionInfo, styleName }, index) => {
                switch (sectionInfo.type) {
                    case 'header':
                        return <h2 key={index} className={styleName}>{sectionInfo.text}</h2>;
                    case 'subHeader':
                        return <h3 key={index} className={styleName}>{sectionInfo.text}</h3>;
                    case 'body':
                        return <p key={index} className={styleName}>{sectionInfo.text}</p>;
                    case 'code':
                        return (
                            <pre key={index} className={styleName}>
                                <code>{sectionInfo.code}</code>
                            </pre>
                        );
                    case 'image':
                        return <img key={index} className={styleName} src={sectionInfo.src} alt={sectionInfo.alt || 'Project image'} />;
                    case 'gallery':
                        return (
                            <div key={index} className={`gallery ${styleName}`}>
                                {sectionInfo.imagePaths.map((src, imgIndex) => (
                                    <div key={imgIndex} className="gallery-item">
                                        <a target="_blank" href={src}>
                                        <img src={src} alt={sectionInfo.captions ? sectionInfo.captions[imgIndex] : `Gallery image ${imgIndex + 1}`} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        );
                    case 'readMe':
                        return <a key={index} className={styleName} href={sectionInfo.link} target="_blank" rel="noopener noreferrer">{sectionInfo.alt}</a>;
                    case 'video':
                        return <video key={index} className={styleName} src={sectionInfo.src} controls />;
                    case 'link':
                        return <a key={index} className={styleName} href={sectionInfo.url} target="_blank" rel="noopener noreferrer">{sectionInfo.label}</a>;
                    default:
                        return <></>;
                }
            })}
        </>
    );
}