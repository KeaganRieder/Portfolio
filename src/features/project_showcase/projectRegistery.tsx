import React, { useEffect, useRef, useState } from "react";

import { Projects } from "./assets/projects";
import type { ApplicationRegistryControls } from "../desktop/appRegistry";
import { ProjectApp, type ProjectEntry } from "./project";
import { ProjectCategoryApp, type ProjectCategoryEntry } from "./ProjectCategories";

import folderIcon from "../../assets/apps/folder.png";
import { ProjectShowcase } from "./projectShowcase";

export interface ProjectRegistryWindowData {
    id: string;
    projectWindow: React.FC<ProjectEntry> | React.FC<ProjectCategoryEntry>;
    version?: number; // bump to force remount/visibility reset
}

export interface ProjectRegistryControls {
    openCategory: (id: string) => void;
    closeCategory: (id: string) => void;
    openProject: (id: string) => void;
    closeProject: (id: string) => void;
}

export const ProjectRegistry = (appRegistryControls: ApplicationRegistryControls, containers: {
    appContainer?: HTMLElement | null;
    shortcutContainer?: HTMLElement | null;
    taskbarContainer?: HTMLElement | null;
}) => {
    const [projectEntries, setProjectEntries] = useState<ProjectEntry[]>([]);
    const [categories, setCategories] = useState<ProjectCategoryEntry[]>([]);
    const [openWindows, setOpenWindows] = useState<ProjectRegistryWindowData[]>([]);
    const projectEntriesRef = useRef<ProjectEntry[]>([]);

    useEffect(() => {
        readProjects();
    }, []);

    useEffect(() => {
        console.log("Project entries updated:", projectEntries);
        projectEntriesRef.current = projectEntries;
    }, [projectEntries]);

    const readProjects = () => {
        Projects.forEach((project) => {
            addProject(project);
            addProjectToCategory(project.categoryID, project);
        });
    };

    const getCategory = (id: string) => {
        return categories.find(category => category.id === id);
    }

    const addProjectToCategory = (id: string, project: ProjectEntry) => {
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

    const addProject = (project: ProjectEntry) => {
        setProjectEntries((prev) => {
            const alreadyExists = prev.some(p => p.id === project.id);
            if (alreadyExists) return prev;
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
        if (category) {
            appRegistryControls.openAppWindow({
                id: category.id,
            });
            setOpenWindows((prev) => {
                const existing = prev.find(w => w.id === category.id);
                if (existing) {
                    return prev.map(w => w.id === category.id ? { ...w, version: (w.version ?? 0) + 1 } : w);
                }
                return [...prev, { id: category.id, projectWindow: ProjectCategoryApp, version: 0 }];
            });

        }
    };

    const openProject = (id: string) => {
        const project = projectEntriesRef.current.find(proj => proj.id === id);
        console.log(projectEntriesRef.current);

        if (project) {
            appRegistryControls.openAppWindow({
                id: project.id,
            });
            setOpenWindows((prev) => {
                const existing = prev.find(w => w.id === project.id);
                if (existing) {
                    return prev.map(w => w.id === project.id ? { ...w, version: (w.version ?? 0) + 1 } : w);
                }
                return [...prev, { id: project.id, projectWindow: ProjectApp, version: 0 }];
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

    }
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
                return <ProjectApp key={`${projectData.id}:${windowData.version ?? 0}`} {...projectData} />;
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
                return <ProjectCategoryApp key={`${categoryData.id}:${windowData.version ?? 0}`} {...categoryData} />;
            }
        });
    }
    return {
        getCategory,
        addProjectToCategory,
        getProject,
        getAllProjects,
        openCategory,
        openProject,
        createProjectShowcase,
        displayOpen,
    };
}
