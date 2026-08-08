import { ImageSection } from "../../../components/projectSections/image";
import type { SectionType } from "../../../types/sectionType";
import type { ProjectEntryProperties } from "./projectModels";

/**
 * Turns a project's declarative `content` array (a ProjectEntryProperties field)
 * into concrete JSX. Each entry's `sectionInfo.type` selects the section
 * component/tag to render, letting project pages be authored as data rather
 * than hand-written markup.
 */
export const ProjectRenderer = (content?: { sectionInfo: SectionType; styleName?: string; }[], applicationInfo?: ProjectEntryProperties) => {
    if (!content) return null;

    return (
        <>
            {content.map(({ sectionInfo, styleName }, index) => {
                // sectionInfo.type is a discriminated union tag; each case narrows
                // sectionInfo to the matching SectionType variant's fields.
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
                        return <ImageSection
                            key={index} imageData={sectionInfo.imageData}
                            styleOverride={styleName}
                            inGallery={false}
                            hoverConfigs={{
                                canHover: true,
                            }}
                            applicationData={applicationInfo?.applicationData}
                        />;
                    case 'gallery':
                        return (
                            <div key={index} className={`gallery ${styleName}`}>
                                {sectionInfo.imageData.map((imageData, imgIndex) => (
                                    <ImageSection key={imgIndex} imageData={imageData}
                                        inGallery={true}
                                        hoverConfigs={{
                                            canHover: true,
                                        }}
                                        applicationData={applicationInfo?.applicationData}
                                    />
                                ))}
                            </div>
                        );
                    case 'readMe':
                        return <a key={index} className={styleName} href={sectionInfo.link} target="_blank" rel="noopener noreferrer">{sectionInfo.alt}</a>;
                    case 'video':
                        return <iframe key={index} className={`project-video ${styleName}`} src={sectionInfo.src} title={sectionInfo.alt} allowFullScreen />;
                    case 'link':
                        return <a key={index} className={styleName} href={sectionInfo.url} target="_blank" rel="noopener noreferrer">{sectionInfo.label}</a>;
                    default:
                        return <></>;
                }
            })}
        </>
    );
}