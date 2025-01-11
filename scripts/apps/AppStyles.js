
import { SITE_COLORS } from '../constants/SiteColors.js';

export const MAIN_STYLES = new Map([
    ["main", {
        zIndex: 4,
        position: "absolute",
        overflow: "hidden",

        boxSizing: "border-box",

        backgroundColor: SITE_COLORS.appBorder,

        border: `2px solid ${SITE_COLORS.appBorder2}`,
        padding: "3px"
    }],

    ["header", {
        position: "relative",
        zIndex: 4,
        width: '100%',
        height: "40px",
        boxSizing: "border-box",
        backgroundColor: SITE_COLORS.appHeaderBackground,
        marginBottom: "5px",
        padding: "2px"

    }],

    ["title", {
        position: "absolute",
        left: "10px",
        top: "10px",

        fontSize: "1.4rem",
        fontFamily: "'Jersey 25', serif",
        fontOpticalSizing: "auto",
        fontWeight: 300,
        fontStyle: "normal",

        color: SITE_COLORS.headingText,
        padding: "0px",
        margin: "0px",

    }],

    ["closeButton", {
        cursor: "pointer",

        position: "absolute",
        right: "10px",
        top: "0px",
        height: "100%"
    }],

    ["body", {
        position: "relative",
        overflowY: "auto",
        width: `100%`,
        height: "calc(100% - 60px)",
        boxSizing: "border-box",

        backgroundColor: SITE_COLORS.appBodyBackground,
        border: `2px solid ${SITE_COLORS.appBorder3}`,

    }],

    ["contentContainerStyle", {
        position: "relative",
        zIndex: 4,
        width: "auto",
        height: "auto",
        boxSizing: "border-box",

        padding: "10px",
    }]
]);

export const ABOUT_ME_STYLE = new Map([
    ["profilePic", {
        position: "relative",
        float: "right",
        width: '500px',
        height: '500px',
        borderRadius: '50%',
    }],

    ["bodyText", {
        position: "relative",

        fontSize: "1.5em",
        color: SITE_COLORS.bodyText,
        padding: "2px",
    }],


    ["skillsBody", {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",

        width: "100%",
        height: "auto",
        boxSizing: "border-box",

        backgroundColor: SITE_COLORS.appBodyBackground2,
        boxShadow: `1px 5px 5px ${SITE_COLORS.appBodyShadow}`,

        padding: "5px"
    }],

    ["skillsSection", {
        textAlign: "center",
    }],

    ["skillsHeader", {
        textAlign: "center",

        fontSize: "3em",
        color: SITE_COLORS.bodyText,
        paddingLeft: "10px",
    }],

    ["skillsSubHeader", {
        fontSize: "2em",
        color: SITE_COLORS.bodyText2,
        height: "50px",
        padding: "2px",
    }],

    ["skillsBodyText", {
        fontSize: "1.5em",
        color: SITE_COLORS.bodyText3,

        padding: "2px",
    }],
]);

export const PDF_STYLE = new Map([]);

export const WORK_DISPLAY_STYLE = new Map([
    ["nav", {
        zIndex: 4,
        position: "absolute",
        overflowY: "auto",
        top: "50px",
        width: '250px',
        height: "calc(100% - 70px)",
        boxSizing: "border-box",

        backgroundColor: SITE_COLORS.appHeaderBackground,
        padding: "5px",
    }],

    ["navButton", {
        cursor: "pointer",

        width: "100%",
        height: "auto",

        boxSizing: "border-box",
        backgroundColor: SITE_COLORS.headerButtonBackground,
        padding: "2px",
        marginBottom: "10px",
    }],

    ["navButtontext", {
        textAlign: "center",
        fontSize: "1.5em",
        color: SITE_COLORS.bodyText,

        height: "auto",

        padding: "0px",
    }],

    ["sectionsContainer", {
        display: "flex",
        flexWrap: "wrap",

        position: "relative",
        backgroundColor: SITE_COLORS.headerButtonBackground,

        height: "auto",
        boxSizing: "border-box",

        padding: "5px",
    }],

    ["sectionsColumn", {
        justifyContent: "center",
        alignItems: "center",
        margin: "2px",
    }],

    ["Piece", {
        cursor: "pointer",

        position: "relative",

        height: "auto",
        boxSizing: "border-box",

        backgroundColor: SITE_COLORS.appBodyBackground3,
        padding: "5px",
    }],

    ["PieceHeader", {
        fontSize: "1.5em",
        textAlign: "center",

        color: SITE_COLORS.bodyText,

        width: "100%",
        padding: "0px",
        margin: "0px",
    }],

    ["PieceImgContainer", {
        display: "flex",
        flexWrap: "wrap",

        width: "100%",
        height: "auto",

        boxSizing: "border-box",

        padding: "4px",
    }],

    ["PieceImg", {
        width: "100%",
        height: "auto",
        boxSizing: "border-box",
    }],

    ["PieceBody", {
        fontSize: "1.0em",
        textAlign: "center",

        color: SITE_COLORS.bodyText,

        width: "100%",
        padding: "0px",

        margin: "0px",
        marginTop: "10px",
    }]
]);