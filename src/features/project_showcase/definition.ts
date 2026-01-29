import type { applicationDefinition } from "../../components/application/definition";

export interface ProjectDefinition {
    id: string;
    categoryId: string;

    title: string;
    description: string;
    tags: string[];

    imageUrl?: string;
    projectUrl?: [string, string][];
    // appContent?: React.ReactNode[]; implement formatter
}

export interface ProjectCategoryDefinition {
    id: string;
    projects: React.ReactNode[];
    isActive?: boolean;
    onClick: (id: string) => void;
    buttonContainer: HTMLElement;
}


export interface ProjectShowcaseDefinition {
    applicationDefinition: applicationDefinition;
}