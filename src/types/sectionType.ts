export type SectionType =
    | { type: 'header'; text: string }
    | { type: 'subHeader'; text: string }
    | { type: 'body'; text: string }
    | { type: 'code'; language: string; code: string }
    | { type: 'image'; src: string; alt?: string }
    | { type: 'gallery'; imagePaths: string[]; captions?: string[] }
    | { type: 'readMe'; link: string; alt: string }
    | { type: 'video'; src: string; alt?: string }
    | { type: 'link'; label: string; url: string };
