import { SITE_COLORS } from "../constants/SiteColors.js";

export const DESKTOP_STYLES = new Map([
    ["desktop", {
        width: "100vw",
        height: "100vh",
    }],

    ["screen", {
        zIndex: 0,
        position: "relative",

        boxSizing: "border-box",
        backgroundImage: "url('./assets/computer/background.png')",
        backgroundColor: SITE_COLORS.desktopBackground,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",

        margin: 0,
        padding: 0,
    }],

    ["taskBar", {
        zIndex: 5,
        position: "absolute",
        left: 0,
        bottom: 0,

        width: "100%",
        height: "40px",

        boxSizing: "border-box",
        backgroundColor: SITE_COLORS.taskBarBackground,
        boxShadow: `0 -4px 10px ${SITE_COLORS.taskBarShadow}`,

        padding: "5px"
    }],
]);

export const SHORTCUT_STYLES = new Map([

    ["container", {
        position: "absolute",
        left: '0px',

        display: "grid",
        gridTemplateColumns: "1fr",

        height: "90%",
        width: "auto",
        boxSizing: "border-box",

        padding: "20px",
    }],

    ["shortcut", {
        position: "relative",
        cursor: "pointer",

        zIndex: 1,
        textAlign: "center",

        height: "100%",
        width: "100%",

        margin: "10px 0px 5px 0px",
        padding: "0px"
    }],

    ["label", {
        fontSize: "1.4rem",
        fontFamily: "'Jersey 25', serif", //figure out other font
        fontOpticalSizing: "auto",
        fontWeight: 300,
        fontStyle: "normal",
        color: SITE_COLORS.shortCutText,
        textShadow: `4px 4px 3px ${SITE_COLORS.textShadow}`,
        margin: "0px"
    }],

    ["icon", {
        height: "60%",
        width: "60%"
    }]
]);