import React, { useEffect, useRef, useState } from "react";

import type { ApplicationRegistryControls } from "../desktop/appRegistry";
import { ProjectApp } from "./project/project";
import type { ProjectEntryProperties } from "./project/projectModels";
import { ProjectCategoryApp, type ProjectCategoryEntry } from "./ProjectCategories";
import { ProjectShowcase } from "./projectShowcase";

import folderIcon from "../../assets/apps/folder.png";
import { ProjectsEntries } from "../../assets/projects/projectsEntries";
import { SkillExamples } from "./skillExampleList";

export interface ProjectRegistryWindowData {
    id: string;
    projectWindow: React.FC<ProjectEntryProperties> | React.FC<ProjectCategoryEntry>;
    zIndex?: number;
}

export const ProjectRegistry = (appRegistryControls: ApplicationRegistryControls, containers: {
    appContainer?: HTMLElement | null;
    shortcutContainer?: HTMLElement | null;
    taskbarContainer?: HTMLElement | null;
}) => {
    const [projectEntries, setProjectEntries] = useState<ProjectEntryProperties[]>([]);
    const [categories, setCategories] = useState<ProjectCategoryEntry[]>([]);
    const [openWindows, setOpenWindows] = useState<ProjectRegistryWindowData[]>([]);

    const skillExamples = SkillExamples();
    const projectEntriesRef = useRef<ProjectEntryProperties[]>([]);

    useEffect(() => {
        readProjects();
    }, []);

    useEffect(() => {
        projectEntriesRef.current = projectEntries;
    }, [projectEntries]);

    const readProjects = () => {
        ProjectsEntries.forEach((project) => {
            addProject(project);
            addProjectToCategory(project.categoryID, project);
        });
    };

    const getCategory = (id: string) => {
        return categories.find(category => category.id === id);
    };
    const getAllCategories = () => {
        return categories;
    };

    const addProjectToCategory = (id: string, project: ProjectEntryProperties) => {
        setCategories((prev) => {
            const existing = prev.find(category => category.id === id);
            if (existing) {

                const updatedProjects = existing.projects.find(p => p.id === project.id)
                    ? existing.projects
                    : [...existing.projects, project];
                return prev.map(category => category.id === id ? { ...category, projects: updatedProjects } : category);
            }

            return [...prev, {
                id: id,
                name: id,
                controls: {
                    openCategory: (categoryId: string) => openCategory(categoryId),
                    openProject: (projectId: string) => openProject(projectId),
                },
                projects: [project],
            }];
        });

    };
    const addProject = (project: ProjectEntryProperties) => {
        setProjectEntries((prev) => {
            const alreadyExists = prev.some(existingEntry => existingEntry.id === project.id);
            if (alreadyExists) return prev;
            skillExamples.addExample(project.tags, {id: project.id, name: project.name});
            const next = [...prev, project];
            return next;
        });
    };
    const getProject = (id: string) => {
        return projectEntries.find(proj => proj.id === id);
    };
    const getAllProjects = () => {
        return projectEntries;
    };

    const openCategory = (id: string) => {
        const category = getCategory(id);
        const windowId = `${id}_app`;
        if (category) {
            appRegistryControls.openAppWindow({
                id: windowId,
            });
            setOpenWindows((prev) => {
                const existing = prev.find(window => window.id === category.id);
                if (existing) {
                    return prev.map(window => window.id === category.id ? { ...window, zIndex: (window.zIndex ?? 0) + 1 } : window);
                }
                return [...prev, { id: category.id, projectWindow: ProjectCategoryApp, zIndex: 0 }];
            });

        }
    };
    const openProject = (id: string) => {
        const project = projectEntriesRef.current.find(proj => proj.id === id);
        const windowId = `${id}_app`;

        if (project) {
            appRegistryControls.openAppWindow({
                id: windowId,
            });
            setOpenWindows((prev) => {
                const existing = prev.find(w => w.id === project.id);
                if (existing) {
                    return prev.map(window => window.id === project.id ? { ...window, zIndex: (window.zIndex ?? 0) + 1 } : window);
                }
                return [...prev, { id: project.id, projectWindow: ProjectApp, zIndex: 0 }];
            });
        };
    };

    const createProjectShowcase = () => {
        return <ProjectShowcase {
            ...{
                categories: categories,
                visibilityControls: {
                    appid: "project_showcase_app",
                    zIndex: appRegistryControls.getAppWindowZIndex("project_showcase_app"),
                    RegistryControls: appRegistryControls,
                    initialVisibility: false,
                },
                containers: containers,
                controls: {
                    openCategory: openCategory,
                    openProject: openProject,
                }
            }
        } />

    };
    const displayOpen = () => {
        return openWindows.map((windowData) => {
            const projectData = getProject(windowData.id);
            const categoryData = getCategory(windowData.id);

            if (projectData) {
                projectData.applicationData = {
                    visibilityControls: {
                        appid: projectData.id + "_app",
                        zIndex: appRegistryControls.getAppWindowZIndex(projectData.id + "_app"),
                        RegistryControls: appRegistryControls,
                    },
                    containers: containers,
                };
                return <ProjectApp key={`${projectData.id}:${windowData.zIndex ?? 0}`} {...projectData} />;
            }

            else if (categoryData) {
                categoryData.applicationData = {
                    visibilityControls: {
                        appid: categoryData.id + "_app",
                        zIndex: appRegistryControls.getAppWindowZIndex(categoryData.id + "_app"),
                        RegistryControls: appRegistryControls,
                    },
                    containers: containers,
                    iconPath: folderIcon,
                };
                return <ProjectCategoryApp key={`${categoryData.id}:${windowData.zIndex ?? 0}`} {...categoryData} />;
            }
        });
    };

    return {
        skillExamples,
        getCategory,
        getAllCategories,
        addProjectToCategory,
        getProject,
        getAllProjects,
        openCategory,
        openProject,
        createProjectShowcase,
        displayOpen,
    };
}
