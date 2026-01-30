// import ReactDOM from "react-dom";

// import folderIcon from "../../assets/apps/folder.png";
// import type { ProjectCategoryDefinition } from "./definition";

// export const ProjectCategory: React.FC<ProjectCategoryDefinition> = ({ id, projects, isActive, onClick, buttonContainer }) => {
//     const categoryButton = () => {
//         return (
//             <button onClick={() => onClick(id)}>
//                 <img src={folderIcon} alt="folder icon" />
//                 <h3>{id}</h3>
//             </button>
//         );
//     };

//     const projectContainer = () => {
//         return (
//             <div id={id} className="project-showcase">
//                 <div className="project-category-scroll-container">
//                     {projects}
//                 </div>
//             </div>
//         );
//     };

//     if (!buttonContainer) {
//         return isActive ? projectContainer() : null;
//     }

//     return (
//         <>
//             {isActive && projectContainer()}
//             {!isActive &&ReactDOM.createPortal(categoryButton(), buttonContainer)}
//         </>
//     );
// };


