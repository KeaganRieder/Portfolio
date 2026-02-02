import { useEffect, useMemo, useState } from "react";

import type { ApplicationDefinition } from "../../components/application/definition";
import { Application } from "../../components/application/application";
import { ProjectCategory, type ProjectCategoryEntry } from "./projectCategory";
import { Projects } from "./assets/projects";
import SearchBar from "../../components/search_bar/serachBar";

import folderIcon from '../../assets/apps/folder.png';
import closeButtonIcon from '../../assets/apps/close_button.png';

export const ProjectDisplay: React.FC<ApplicationDefinition> = ({ info, visibilityControls, containers }) => {

    const [activeCategoryContainer, setActiveCategoryContainer] = useState<HTMLElement | null>(null);
    const [categoriesContainer, setCategoriesContainer] = useState<HTMLElement | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const projectCategories = useMemo<ProjectCategoryEntry[]>(() => {
        const categoryMap = new Map<string, ProjectCategoryEntry>();

        Projects.forEach((project) => {
            const existing = categoryMap.get(project.categoryID);
            const baseEntry: ProjectCategoryEntry = existing ?? {
                id: project.categoryID,
                name: project.categoryID,
                button: {
                    iconPath: folderIcon,
                    onClick: (id: string) => setActiveCategory(id),
                    container: categoriesContainer,
                },
                page: {
                    isCurrentlyVisible: false,
                    projects: [],
                    container: activeCategoryContainer,
                }
            };

            categoryMap.set(project.categoryID, {
                ...baseEntry,
                button: {
                    ...baseEntry.button,
                    container: categoriesContainer,
                    onClick: (id: string) => setActiveCategory(id)
                },
                page: {
                    ...baseEntry.page,
                    container: activeCategoryContainer,
                    projects: [...baseEntry.page.projects, project],
                }
            });
        });

        return Array.from(categoryMap.values());
    }, [activeCategoryContainer, categoriesContainer]);

    const filteredCategories = useMemo<ProjectCategoryEntry[]>(() => {
        const query = searchQuery.trim().toLowerCase();
        if (query.length === 0) {
            return projectCategories;
        }

        return projectCategories
            .map((category) => {
                const matchingProjects = category.page.projects.filter((project) => {
                    const text = `${category.name} ${project.name} ${project.tags.join(" ")} ${project.overviewContents.description}`.toLowerCase();
                    return text.includes(query);
                });

                const categoryMatches = category.name.toLowerCase().includes(query) || category.id.toLowerCase().includes(query);

                return {
                    ...category,
                    page: {
                        ...category.page,
                        projects: categoryMatches ? category.page.projects : matchingProjects,
                    }
                };
            })
            .filter((category) => category.page.projects.length > 0);
    }, [projectCategories, searchQuery]);

    useEffect(() => {
        if (filteredCategories.length === 0) {
            setActiveCategory(null);
            return;
        }

        const currentCategory = filteredCategories.find((category) => category.id === activeCategory);
        if (!currentCategory) {
            setActiveCategory(filteredCategories[0].id);
        }
    }, [filteredCategories, activeCategory]);

    const categoriesReadyToRender = useMemo<ProjectCategoryEntry[]>(() => {
        return filteredCategories.map((category) => ({
            ...category,
            button: {
                ...category.button,
                container: categoriesContainer,
                onClick: (id: string) => setActiveCategory(id),
            },
            page: {
                ...category.page,
                container: activeCategoryContainer,
                isCurrentlyVisible: category.id === activeCategory,
            }
        }));
    }, [filteredCategories, activeCategory, categoriesContainer, activeCategoryContainer]);

    const shortcut = () => {
        return (
            {
                desktop: {
                    id: info.id + "_shortcut",
                    appName: info.appName,
                    iconPath: folderIcon,

                }, taskbar: {
                    id: info.id + "_shortcut",
                    appName: info.appName,
                    iconPath: folderIcon,
                }
            }
        );
    };

    const bodyContent = () => {
        return (
            <div className="project-display">
                <div className="category-buttons" ref={(element: HTMLElement | null) => { setCategoriesContainer(element); }} />
                <div className="category-content" ref={(element: HTMLElement | null) => { setActiveCategoryContainer(element); }} />

                {categoriesReadyToRender.map((category) => (
                    <ProjectCategory key={category.id} {...category} />
                ))}
            </div>
        );
    }

    const backButton = () => {
        return (
            <button onClick={() => {setActiveCategory(null); console.log("Back button clicked");}}>
                <img src={closeButtonIcon} alt="Minimize" />
            </button>
        );
    }

    const headerContent = () => {
        return (
            <SearchBar placeholder="Search Projects..." onSearchChange={(query: string) => {
                setSearchQuery(query);
            }} />
        );
    }


    return (
        <Application
            info={info}
            visibilityControls={visibilityControls}
            containers={containers}
            shortcuts={shortcut()}
            content={{ body: bodyContent(), header: headerContent(), headerButtons: activeCategory ? backButton() : undefined }}
        />

    );
}