import { AppsEntries } from "./appsEntries";
import type { AppRegistryEntry } from "./appRegistry";

import { ProjectsEntries } from "../../assets/projects/projectsEntries";
import { Skills } from "../about_me/assets/skills";

import { ProjectApp } from "../project_showcase/project/project";
import { ProjectCategoryApp, type ProjectCategoryEntry } from "../project_showcase/projectCategories";
import { ProjectShowcase } from "../project_showcase/projectShowcase";
import type { ProjectEntryProperties } from "../project_showcase/project/projectModels";
import type { skillExample } from "../../types/skill";

import folderIcon from "../../assets/apps/icons/folder_icon.png";

import type { RegistryEntry, RenderContext, ProjectHelpers } from "./registryTypes";

// Callbacks (owned by ApplicationRegistry) that open a project/category window by id.
interface BuildRegistryEntriesParams {
    openProject: (id: string) => void;
    openCategory: (id: string) => void;
}

// Everything ApplicationRegistry needs after building the registry: the flat entry
// list to render, the derived categories, and helpers to hand down to apps.
interface BuildRegistryEntriesResult {
    entries: RegistryEntry[];
    categories: ProjectCategoryEntry[];
    projectHelpers: ProjectHelpers;
}

// Generates matching desktop/taskbar shortcut definitions for an app window, keyed by its id.
const buildShortcuts = (id: string, name: string, icon: string) => ({
    desktop: { id: id + "_shortcut", appName: name, iconPath: icon },
    taskbar: { id: id + "_shortcut", appName: name, iconPath: icon },
});

// Derive skill -> example-projects mapping directly from ProjectsEntries.
// Previously this was built incrementally (one setState per project as
// ProjectRegistry mounted); now that every project is known upfront via the
// glob, it's just a synchronous reduce.
const buildSkillExamples = (projects: ProjectEntryProperties[]): Record<string, skillExample[]> => {
    const knownSkillIds = new Set(Skills.map((entry) => entry.skill.id));
    const examples: Record<string, skillExample[]> = {};

    projects.forEach((project) => {
        project.tags.forEach((tag) => {
            if (!tag.skill || !knownSkillIds.has(tag.skill.id)) return;

            const existing = examples[tag.skill.id] ?? [];
            const alreadyExists = existing.some((example) => example.projectId === project.id);
            if (alreadyExists) return;

            examples[tag.skill.id] = [...existing, { projectId: project.id, projectName: project.name }];
        });
    });

    return examples;
};

// Group projects into categories by categoryID, same grouping logic that
// used to live inside ProjectRegistry's addProjectToCategory.
const buildCategories = (
    projects: ProjectEntryProperties[],
    controls: BuildRegistryEntriesParams
): ProjectCategoryEntry[] => {
    const categoryMap = new Map<string, ProjectCategoryEntry>();

    projects.forEach((project) => {
        const id = project.categoryID;
        const existing = categoryMap.get(id) ?? {
            id,
            name: id,
            controls: { openCategory: controls.openCategory, openProject: controls.openProject },
            projects: [] as ProjectEntryProperties[],
        };

        if (!existing.projects.some((p) => p.id === project.id)) {
            existing.projects = [...existing.projects, project];
        }

        categoryMap.set(id, existing);
    });

    return Array.from(categoryMap.values());
};

/**
 * Assembles the complete set of openable windows for the desktop UI by
 * combining statically registered apps (AppsEntries) with entries derived
 * from the project data (ProjectsEntries): one window per project, one per
 * category, and the single "browse all" showcase window. This is the core
 * of the app-registration system - "registering" an app just means
 * appearing in the returned `entries` list with a render function.
 */
export const buildRegistryEntries = (controls: BuildRegistryEntriesParams): BuildRegistryEntriesResult => {
    const skillExamples = buildSkillExamples(ProjectsEntries);
    const projectHelpers: ProjectHelpers = {
        skillExamples: { examples: skillExamples },
        openProject: controls.openProject,
    };

    // ---- apps (About Me, Email, and anything future dropping an appEntry.ts) ----
    const appEntries: RegistryEntry[] = AppsEntries.map((app: AppRegistryEntry) => ({
        id: app.id,
        name: app.name,
        kind: "app",
        eager: true,
        render: (ctx: RenderContext) => {
            const AppComponent = app.component;
            return (
                <AppComponent
                    info={{ id: app.id, appName: app.name }}
                    visibilityControls={ctx.visibilityControls}
                    containers={ctx.containers}
                    shortcuts={buildShortcuts(app.id, app.name, app.icon)}
                    projectRegistry={projectHelpers}
                />
            );
        },
    }));

    // ---- categories, derived from projects ----
    const categories = buildCategories(ProjectsEntries, controls);

    // ---- individual project windows ----
    const projectEntries: RegistryEntry[] = ProjectsEntries.map((project) => {
        // kept for ProjectOverviewContainer's onClick, used when browsing a category
        project.controls = { openProject: controls.openProject };

        return {
            id: project.id,
            name: project.name,
            kind: "project",
            eager: false,
            render: (ctx: RenderContext) => (
                <ProjectApp
                    {...project}
                    applicationData={{ visibilityControls: ctx.visibilityControls, containers: ctx.containers }}
                />
            ),
        };
    });

    // ---- category windows ----
    const categoryEntries: RegistryEntry[] = categories.map((category) => ({
        id: category.id,
        name: category.name,
        kind: "category",
        eager: false,
        render: (ctx: RenderContext) => (
            <ProjectCategoryApp
                {...category}
                applicationData={{
                    visibilityControls: ctx.visibilityControls,
                    containers: ctx.containers,
                    iconPath: folderIcon,
                }}
            />
        ),
    }));

    // ---- the single "browse all projects" window ----
    const showcaseEntry: RegistryEntry = {
        id: "project_showcase",
        name: "Project Showcase",
        kind: "project_showcase",
        eager: true,
        render: (ctx: RenderContext) => (
            <ProjectShowcase
                categories={categories}
                visibilityControls={ctx.visibilityControls}
                containers={ctx.containers ?? {}}
                controls={{ openCategory: controls.openCategory, openProject: controls.openProject }}
            />
        ),
    };

    return {
        entries: [...appEntries, ...projectEntries, ...categoryEntries, showcaseEntry],
        categories,
        projectHelpers,
    };
};
