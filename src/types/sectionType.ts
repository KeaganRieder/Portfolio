export type SectionType =
    | { type: 'header'; text: string }
    | { type: 'subHeader'; text: string }
    | { type: 'body'; text: string }
    | { type: 'code'; language: string; code: string }
    | { type: 'image'; imageData: ImageData; }
    | { type: 'gallery'; imageData: ImageData[]; }
    | { type: 'readMe'; link: string; alt: string }
    | { type: 'video'; src: string; alt?: string }
    | { type: 'link'; label: string; url: string };

export type ImageData = {
    name: string;
    src: string;
    caption?: string;
    isPixelated?: boolean;
}


const normalizeImageSrc = (value: unknown): string => {
    if (typeof value === 'string') {
        return value;
    }

    if (value && typeof value === 'object' && 'default' in (value as Record<string, unknown>)) {
        const maybeDefault = (value as { default?: unknown }).default;
        if (typeof maybeDefault === 'string') {
            return maybeDefault;
        }
    }

    console.warn('Unexpected image import shape', value);
    return '';
};

const ImageNameNormalizer = (path: string): string => {
    const name = path.split("/").pop()?.split(".")[0] || "Image";
    return name.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

export const ImageDateFormatter = (path: string, src: string, isPixelated?: boolean): ImageData => {
    const name = ImageNameNormalizer(path);
    const caption = name;
    return { name, src, caption, isPixelated };
};


export const readImageGroup = (imageGroup: Record<string, unknown>, isPixelated?: boolean): ImageData[] => {
    return Object.entries(imageGroup).map(([path, src]) =>
        ImageDateFormatter(path, normalizeImageSrc(src), isPixelated)
    );
};
