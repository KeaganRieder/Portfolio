// import React from "react";

// import { Application } from "../../components/application/application";
// import type { applicationDefinition } from "../../components/application/definition";
// import { Projects } from "./assets/projects";
// import { ProjectCategory } from "./projectCatagory";
// import { Project } from "./project";
// import { ButtonClickedEvent } from "../../services/AnalyticService";


// import xButtonIcon from '../../assets/apps/close_button.png';
// import minimizeButtonIcon from '../../assets/apps/close_button.png';

// import SearchBar from "../../components/search_bar/serachBar";
// import type { ProjectCategoryDefinition, ProjectDefinition } from "./definition";

// export const ProjectShowcase: React.FC<applicationDefinition> = ({ id, appName, parent, shortcutContainer, taskbarContainer, shortcut, taskbarShortcut }) => {
//     const [categoryButtonContainer, setCategoryButtonContainer] = React.useState<HTMLDivElement | null>(null);
//     const [currentProjectCategory, setCurrentProjectCategory] = React.useState<string | null>(null);
//     const [lastProjectCategory, setLastProjectCategory] = React.useState<string | null>(null);

//     const [searchQuery, setSearchQuery] = React.useState<string>("");

//     const groupedProjects = React.useMemo(() => {
//         const groups = new Map<string, ProjectDefinition[]>();
//         Projects.forEach((project) => {
//             const existing = groups.get(project.categoryId) ?? [];
//             groups.set(project.categoryId, [...existing, project]);
//         });
//         return groups;
//     }, []);

//     const categoryButtonClicked = React.useCallback((categoryId: string) => {
//         if (currentProjectCategory === categoryId) {
//             return;
//         }
//         setCurrentProjectCategory(categoryId);
//         ButtonClickedEvent(categoryId, { category_name: categoryId });
//     }, [currentProjectCategory]);

//     const searchQueryChanged = (query: string) => {
//         setSearchQuery(query);
//     };

//     const searchedProjects = React.useMemo(() => {
//         const normalizedQuery = searchQuery.trim().toLowerCase();
//         if (!normalizedQuery) {
//             return [] as React.ReactNode[];
//         }

//         return Projects
//             .filter((project) =>
//                 project.title.toLowerCase().includes(normalizedQuery) ||
//                 project.description.toLowerCase().includes(normalizedQuery) ||
//                 project.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
//             )
//             .map((project) => <Project key={`search-${project.id}`} project={project} />);
//     }, [searchQuery]);

//     const categoryDefinitions = React.useMemo<ProjectCategoryDefinition[]>(() => {
//         if (!categoryButtonContainer) {
//             return [];
//         }

//         return Array.from(groupedProjects.entries()).map(([categoryId, projects]) => ({
//             id: categoryId,
//             projects: projects.map((project) => <Project key={project.id} project={project} />),
//             isActive: currentProjectCategory === categoryId,
//             onClick: categoryButtonClicked,
//             buttonContainer: categoryButtonContainer,
//         }));
//     }, [categoryButtonClicked, categoryButtonContainer, currentProjectCategory, groupedProjects]);

//     const projectShowcaseContent = () => {
//         const hasSearched = searchQuery.trim().length > 0;

//         if (hasSearched) {
//             return (
//                 <>
//                     <div className="project-showcase">
//                         <div className="project-category-scroll-container">
//                             {searchedProjects.length > 0 ? searchedProjects : <p>No projects found.</p>}
//                         </div>
//                     </div>
//                 </>)
//         }
//         return (
//             <>
//                 <div className="project-category-container" ref={setCategoryButtonContainer}></div>
//                 {categoryDefinitions.map((category) => (
//                     <ProjectCategory
//                         key={category.id}
//                         id={category.id}
//                         projects={category.projects}
//                         isActive={category.isActive}
//                         onClick={category.onClick}
//                         buttonContainer={category.buttonContainer}
//                     />
//                 ))}
//             </>
//         );
//     };

//     const searchBar = () => {
//         const OnBackButtonClicked = () => {
//             if (currentProjectCategory) {
//                 setLastProjectCategory(currentProjectCategory);
//             }
//             setCurrentProjectCategory(null);
//         };
//         const OnForwardButtonClicked = () => {
//             if (lastProjectCategory) {
//                 setCurrentProjectCategory(lastProjectCategory);
//                 setLastProjectCategory(null);
//             }
//         };
//         return (<>
//             <div className="search-bar-container">
//                 <SearchBar onSearchChange={searchQueryChanged} />
//                 <button onClick={OnBackButtonClicked}>
//                     <img src={minimizeButtonIcon} alt="backward" />
//                 </button>
//                 <button onClick={OnForwardButtonClicked}>
//                     <img src={xButtonIcon} alt="forward" />
//                 </button>
//             </div>
//         </>);
//     }

//     return (
//         <>
//             <Application
//                 id={id}
//                 appName={appName}
//                 parent={parent}
//                 shortcutContainer={shortcutContainer}
//                 taskbarContainer={taskbarContainer}
//                 headerContent={searchBar()}
//                 content={projectShowcaseContent()}
//                 shortcut={shortcut}
//                 taskbarShortcut={taskbarShortcut}
//             />
//         </>
//     );
// };
