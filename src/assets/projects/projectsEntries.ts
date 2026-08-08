// Aggregates every individual project "information.ts" file (e.g. 3d_models/alone,
// puzzle_solvers/n_queens, websites/slime_clicker) into a single ProjectsEntries collection
// that the project showcase feature reads to render all portfolio projects.
import type { ProjectEntryProperties } from "../../features/project_showcase/project/projectModels";

// Projects directly under a category folder (e.g. ./puzzle_solvers/n_queens/information.ts).
const ungroupedProjects = import.meta.glob("./*/information.ts", { eager: true });
// Projects nested one level deeper within a category (e.g. ./video_games/soul_sync/information.ts).
const groupedProjects = import.meta.glob("./*/**/information.ts", { eager: true });

// Each glob result module exports one or more named ProjectEntryProperties objects;
// flatten those module exports down into flat arrays of entries.
const ungroupedProjectEntries: ProjectEntryProperties[] = Object.values(ungroupedProjects).flatMap((mod) =>
    Object.values(mod as Record<string, ProjectEntryProperties>)
);
const groupedProjectEntries: ProjectEntryProperties[] = Object.values(groupedProjects).flatMap((mod) =>
    Object.values(mod as Record<string, ProjectEntryProperties>)
);

// The full combined registry of every project, consumed by the project showcase UI.
export const ProjectsEntries: ProjectEntryProperties[] = [...ungroupedProjectEntries, ...groupedProjectEntries];




