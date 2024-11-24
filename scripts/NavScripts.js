/* 
-----------------------------------------------------------
file contains definitions for scripts used in 
the navigation of site contents
-----------------------------------------------------------
*/

// gives functionality to side bar/files to make them open the different 
// sections in the portfolio
function OpenFile(sectionId) {
    var section = document.getElementById(sectionId);
    if (section.style.display == "none" || section.style.display == "") {
        section.style.display = "grid";
    }
}

// gives functionality to files x button to close the file
function CloseFile(sectionId) {
    var section = document.getElementById(sectionId);
    section.style.display = "none";

}

// toggles the display of the section
function ToggleSection(sectionId) {
    var section = document.getElementById(sectionId);

    if (section.style.display == "none" || section.style.display == "") {
        section.style.display = "grid";
    }

    else {
        section.style.display = "none";
    }

}
// toggles the display of the section and it's corresponding top 
// bar nav tab
function ToggleSection(sectionId, sectionTabId) {
    var section = document.getElementById(sectionId);
    var sectionTab = document.getElementById(sectionTabId);

    if (section.style.display == "none" || section.style.display == "") {
        section.style.display = "grid";
    }

    else {
        section.style.display = "none";
    }

    if (sectionTab.style.display == "none" || sectionTab.style.display == "") {
        sectionTab.style.display = "grid";
    }

    else {
        sectionTab.style.display = "none";
    }
}

function ToggleWork(workID) {
    var overviewSection = document.getElementById("workOverView");
    var focusedSection = document.getElementById("focusedWork");
    var work = document.getElementById(workID);

    if (focusedSection.style.display == "none" || focusedSection.style.display == "") {
        focusedSection.style.display = "inline-block";
        overviewSection.style.display = "none";

    }
    else {
        overviewSection.style.display = "grid";
        focusedSection.style.display = "none";
    }

    if (work.style.display == "none" || work.style.display == "") {
        work.style.display = "inline-block";
    } else {
        work.style.display = "none";
    }
}