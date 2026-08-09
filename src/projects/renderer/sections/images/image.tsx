import React, { useState } from "react";
import type { ImageData } from "@/shared/types/sectionType";
import type { VisibilityControls } from "@/system/window/types";
import { Application } from "@/system/window/application";
import './image.css';
/** Props for ImageSection: the image to show, its styling, and optional click-to-open-app behavior. */
export interface ImageSectionProps {
    imageData: ImageData;
    styleOverride?: string;
    inGallery?: boolean;
    hoverConfigs?: {
        canHover?: boolean;
    }
    applicationData?: {
        visibilityControls: VisibilityControls;
        containers?: {
            appContainer?: HTMLElement | null;
            shortcutContainer?: HTMLElement | null;
            taskbarContainer?: HTMLElement | null;
        };
    };
}

/**
 * Renders a single project image, optionally with a hover caption overlay
 * and/or click-to-open behavior that spawns an Application window showing
 * the image full-size (used e.g. in project galleries).
 */
export const ImageSection: React.FC<ImageSectionProps> = ({ imageData, styleOverride, inGallery, hoverConfigs, applicationData }) => {
    const [aspectStyle, setAspectStyle] = useState<string>('');
    const [isAppOpen, setIsAppOpen] = useState<boolean>(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const hasApp = Boolean(applicationData);
    const canHover = hoverConfigs?.canHover ?? true;
    const appId = hasApp ? `${imageData.name.replace(/\s+/g, '_')}_img_app` : undefined;

    // Classifies the loaded image's aspect ratio so gallery layout CSS can
    // size landscape/portrait/square images differently.
    const setImageConfigs = (img: HTMLImageElement) => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        if (aspectRatio > 1) {
            setAspectStyle('landscape-image');
        } else if (aspectRatio < 1) {
            setAspectStyle('portrait-image');
        } else {
            setAspectStyle('square-image');
        }
    };

    // Builds the image wrapper's class list from its current state/props.
    const getStyle = () => {
        const classes: string[] = [];
        if (hasApp) {
            classes.push('clickable-image');
        }
        if (inGallery && aspectStyle) {
            classes.push(aspectStyle);
        }

        if (imageData.isPixelated) {
            classes.push('pixelated-image');
        }

        if (styleOverride) {
            classes.push(styleOverride);
        }

        return classes.join(' ');
    };

    // Renders the caption overlay shown while hovering, if hover is enabled.
    const hoverBody = () => {
        if (canHover && isHovered) {
            return (
                <div className={"image-hover-body"}>
                    <p>{imageData.caption}</p>
                </div>
            )
        }
        return (<></>);
    };

    // Opens (and brings to front) the full-size image Application window.
    const handleImageClick = () => {
        if (!hasApp || !appId) return;
        const { RegistryControls } = applicationData!.visibilityControls;
        RegistryControls.openAppWindow({ id: appId });
        RegistryControls.bringToFront(appId);
        setIsAppOpen(true);
    };

    return (
        <>
            <div className={getStyle()}>
                <img
                    src={imageData.src} alt={imageData.name} onLoad={(e) => setImageConfigs(e.currentTarget)}
                    onMouseEnter={() => canHover && setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                    {...(hasApp ? { onClick: handleImageClick } : {})}
                />
                {hoverBody()}
            </div>
            {isAppOpen && hasApp && appId && (
                <Application
                    info={{
                        id: appId,
                        appName: imageData.name,
                        tags: [],
                    }}
                    visibilityControls={{
                        ...applicationData!.visibilityControls,
                        appid: appId,
                        initialVisibility: true,
                        zIndex: applicationData!.visibilityControls.RegistryControls.getAppWindowZIndex(appId),
                    }}
                    containers={applicationData!.containers}
                    content={{
                        body: (
                            <>
                                <img src={imageData.src} alt={imageData.name} className={"app-image "+ (imageData.isPixelated ? "pixelated-image" : "")} />
                            </>
                        ),
                        contentContainerStyle: "app-image-container"
                    }}
                />
            )}
        </>
    );
};