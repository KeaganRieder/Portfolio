import EmbeddedElement from '../elements/EmbeddedElement.js';
import { appColors, textColors, otherColors } from './SiteColors.js';
import { fontStyles } from './TextStyles.js';

export const AppStyle = {
    mainContainer: {
        zIndex: 4,
        position: "absolute",
        overflow: "hidden",
        boxSizing: "border-box",
        
        backgroundColor: appColors.border.middle,
        border: `2px solid ${appColors.border.outer}`,
        padding: "3px"
    },

    header: {
        container: {
            position: "relative",
            zIndex: 4,
            width: '100%',
            height: "40px",
            boxSizing: "border-box",
            backgroundColor: appColors.header,
            marginBottom: "5px",
            padding: "2px"
        },
        text: {
            position: "absolute",
            left: "10px",
            top: "0px",
            ...fontStyles.header.appTitle,
            color: textColors.header.style1,
            padding: "0px",
            margin: "0px"
        },
        closeButton: {
            cursor: "pointer",
            position: "absolute",
            right: "10px",
            top: "0px",
            height: "100%"
        },
    },

    content: {
        container: {
            position: "relative",
            overflowY: "auto",
            width: "100%",
            height: "calc(100% - 60px)",
            boxSizing: "border-box",
            backgroundColor: appColors.body,
            border: `2px solid ${appColors.border.inner}`
        },

        scrollContainer: {
            position: "relative",
            zIndex: 4,
            width: "auto",
            height: "auto",
            boxSizing: "border-box",
            padding: "10px",

            scrollbarColor: `${otherColors.scrollbar.thumb} ${otherColors.scrollbar.track}`,
            scrollbarWidth: "thin"
        },
        embeddedElement: {
            iframe:{
                display: 'inline-block',
                border: 'none',
                boxSizing: 'border-box',
                overflowX:'hidden',
                width: '100%',
                height: '100%',
                paddingLeft:'20.5%',
                paddingRight:'24%',
            },
            embed:{
                display:'inline-block',
                borderStyle: 'none',
                width: 'auto',
                height: '100%',
            },
        },
    },
}

export const AboutMeStyles = {
    profilePic: {
        position: "relative",
        float: "right",
        width: '500px',
        height: '500px',
        borderRadius: '50%',
    },

    bodyText: {
        ...fontStyles.body.style2,
        color: textColors.body.style1,
        padding: "2px",
    },

    skills: {
        body: {
            main: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                width: "100%",
                height: "auto",
                boxSizing: "border-box",
                backgroundColor: appColors.aboutMe.skillsSectionBg,
                boxShadow: `1px 5px 5px ${appColors.bodyShadow}`,
                padding: "5px",
            },
            sub: {
                textAlign: "center",
            },
        },

        text: {
            header: {
                ...fontStyles.header.style1,
                color: textColors.header.style1,
                paddingLeft: "20px",

            },
            subHeader: {
                ...fontStyles.subHeader.style2,
                color: textColors.subHeader.style2,
                padding: "2px",
            },
            body: {
                ...fontStyles.body.style2,
                color: textColors.body.style2,
                padding: "2px",
            },
        }
    }
}

export const WorkDisplayStyle = {
    nav: {
        container: {
            zIndex: 4,
            position: "absolute",
            overflowY: "auto",
            top: "50px",
            width: '250px',
            height: "calc(100% - 70px)",
            boxSizing: "border-box",

            backgroundColor: appColors.workShowcase.nav.mainContainer,
            padding: "5px",
        },

        scrollContainer: {
            height: "auto",
            boxSizing: "border-box",
            paddingBottom: "50px",
        },

        button: {
            cursor: "pointer",

            width: "100%",
            height: "auto",

            boxSizing: "border-box",
            backgroundColor: appColors.workShowcase.nav.tab,
            padding: "2px",
            marginBottom: "10px",
        },
        text: {
            ...fontStyles.subHeader.workShowcaseNav,
            color: textColors.subHeader.style4,
            textAlign: "center",
            height: "auto",
            padding: "0px",
        },
    },

    sections: {
        container: {
            display: "flex",
            flexWrap: "wrap",
            position: "relative",
            backgroundColor: appColors.workShowcase.pieceOverView.main,

            height: "auto",
            width: "auto",
            boxSizing: "border-box",

            padding: "5px",
        },

        column: {
            flex: "0",
            justifyContent: "center",
            alignItems: "center",
            margin: "2px",
        },


    },

    pieceDisplay: {
        container: {
            main: {
                cursor: "pointer",

                position: "relative",
                height: "auto",
                boxSizing: "border-box",
                backgroundColor : appColors.workShowcase.pieceOverView.display,
                padding: "5px",
                margin: "5px",
            },

            img: {
                display: "flex",
                flexWrap: "wrap",

                width: "100%",
                height: "auto",

                boxSizing: "border-box",

                padding: "4px",
            }
        },

        pieceImg: {
            width: "100%",
            height: "auto",
            boxSizing: "border-box",
        },

        text: {
            header: {
                ...fontStyles.subHeader.style2,

                color: textColors.subHeader.style1,
                textAlign: "center",

                width: "100%",
                padding: "0px",
                margin: "0px",
            },
            body: {
                ...fontStyles.body.style2,

                color: textColors.body.style1,
                textAlign: "center",

                width: "100%",
                padding: "0px",

                margin: "0px",
                marginTop: "10px",
            }
        },
    },
};

export const Works = {

}