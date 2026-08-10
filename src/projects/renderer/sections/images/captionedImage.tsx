import { ImageSection } from "./image";
import type { ImageData } from "../../../../shared/types/sectionType";
import type { VisibilityControls } from "@/system/window/types";
import './captionedImage.css';

export interface CaptionedImageProps {
    imageData: ImageData;
    description: string;
    styleOverride?: string;
    enlargeable?: boolean;
    applicationData?: {
        visibilityControls: VisibilityControls;
        containers?: {
            appContainer?: HTMLElement | null;
            shortcutContainer?: HTMLElement | null;
            taskbarContainer?: HTMLElement | null;
        };
    };
}

/** Figure-style image + always-visible description. Delegates the image
 *  itself to ImageSection so click-to-open-fullscreen behaves identically
 *  to every other project image - unless `enlargeable` is false, in which
 *  case applicationData is withheld and ImageSection renders as a plain,
 *  non-clickable image (e.g. for small/decorative shots where enlarging
 *  adds nothing). Hover is disabled since ImageSection's hover-overlay
 *  caption would visually collide with the persistent one below. */
export const CaptionedImageSection: React.FC<CaptionedImageProps> = ({
    imageData,
    description,
    styleOverride,
    enlargeable = true,
    applicationData,
}) => {
    return (
        <figure className={`captioned-image ${styleOverride ?? ''}`}>
            <ImageSection
                imageData={imageData}
                inGallery={false}
                hoverConfigs={{ canHover: false }}
                applicationData={enlargeable ? applicationData : undefined}
            />
            <figcaption>
                {imageData.caption && <h4>{imageData.caption}</h4>}
                <p>{description}</p>
            </figcaption>
        </figure>
    );
};
