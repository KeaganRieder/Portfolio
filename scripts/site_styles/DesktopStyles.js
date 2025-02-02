import { SITE_COLORS } from "./SiteColors.js";

export const DeskTopStyles = {
    desktop: {
        width: "100vw",
        height: "100vh",
    },

    screen: {
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
    },

    taskBar: {
        zIndex: 5,
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "40px",
        boxSizing: "border-box",
        backgroundColor: SITE_COLORS.taskBarBackground,
        boxShadow: `0 -4px 10px ${SITE_COLORS.taskBarShadow}`,
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
            padding: "20px",
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
            fontSize: "1.4rem",
            fontFamily: "'Jersey 25', serif",
            fontOpticalSizing: "auto",
            fontWeight: 300,
            fontStyle: "normal",
            color: SITE_COLORS.shortCutText,
            textShadow: `4px 4px 3px ${SITE_COLORS.textShadow}`,
            margin: "0px",
        },

        img: {
            width: "auto",
            height: "60%",
        }
    },
}