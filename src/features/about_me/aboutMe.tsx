
import { Application } from "../../components/application/application";
import type { ApplicationDefinition } from "../../components/application/definition";

export const AboutMe: React.FC<ApplicationDefinition> = ({info, containers, shortcuts}) => {

    const Bio = () => {
        
    }

    const aboutMeContent = () => {
        return (
            <></>);
    }

    return (<>
        <Application
            info={info}
            containers={containers}
            shortcuts={shortcuts}
        />
    </>
    );
}