import { Application } from "../../components/application/application";
import type { applicationDefinition } from "../../components/application/definition";

export const AboutMe: React.FC<applicationDefinition> = ({ id, appName, parent, shortcutContainer, taskbarContainer, content, shortcut, taskbarShortcut }) => {

    const Bio = () => {
        
    }

    const aboutMeContent = () => {
        return (
            <></>);
    }

    return (<>
        <Application
            id={id}
            appName={appName}
            parent={parent}
            shortcutContainer={shortcutContainer}
            taskbarContainer={taskbarContainer}
            content={content}
            shortcut={shortcut}
            taskbarShortcut={taskbarShortcut}
        />
    </>
    );
}