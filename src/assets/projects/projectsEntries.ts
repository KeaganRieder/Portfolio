import type { ProjectEntryProperties } from "../../features/project_showcase/project/projectModels";

const ungroupedProjects = import.meta.glob("./*/information.ts", { eager: true });
const groupedProjects = import.meta.glob("./*/**/information.ts", { eager: true });

const ungroupedProjectEntries: ProjectEntryProperties[] = Object.values(ungroupedProjects).flatMap((mod) =>
    Object.values(mod as Record<string, ProjectEntryProperties>)
);
const groupedProjectEntries: ProjectEntryProperties[] = Object.values(groupedProjects).flatMap((mod) =>
    Object.values(mod as Record<string, ProjectEntryProperties>)
);

export const ProjectsEntries: ProjectEntryProperties[] = [...ungroupedProjectEntries, ...groupedProjectEntries];




