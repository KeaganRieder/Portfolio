import { ComputerContent } from "../content/ComputerContent.js";
import { deskTopColors, textColors } from "./SiteColors.js";
import { fontStyles } from './TextStyles.js';

export const DeskTopStyles = {
    desktop: {
        width: "100vw",
        height: "100vh",
    },

    screen: {
        zIndex: 0,
        position: "relative",
        boxSizing: "border-box",
        backgroundImage: `url(${ComputerContent.screen.backGround})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        margin: 0,
        padding: 0,
    },

    taskBar: {
        zIndex: 5,
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "40px",
        boxSizing: "border-box",
        backgroundColor: deskTopColors.taskBar.main,
        boxShadow: `0 -4px 10px ${deskTopColors.taskBar.shadow}`,
        padding: "5px",
    },

    shortcuts: {
        container: {
            position: "absolute",
            left: '0px',
            display: "flex",
            flexWrap: "wrap",

            height: "calc(100% - 40px)",
            width: "auto",

            boxSizing: "border-box",
            padding: "0px",
            paddingTop: "20px",
        },

        column: {
            flex: "20%",
            padding: "0 20px",
        },

        body: {
            position: "relative",
            cursor: "pointer",
            verticalAlign: "middle",
            zIndex: 1,
            textAlign: "center",
            boxSizing: "border-box",
            paddingBottom: "10px",
        },

        label: {
            ...fontStyles.subHeader.siteNav,
            color: textColors.subHeader.style1,
            textShadow: `4px 4px 3px ${textColors.shadow}`,
            margin: "0px",
        },

        img: {
            width: "auto",
            height: "60%",
        }
    },
}