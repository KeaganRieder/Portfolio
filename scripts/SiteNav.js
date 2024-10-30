/* 
-----------------------------------------------------------
defines functionality for navigating the site like:
- hiding and showing windows/docs
-----------------------------------------------------------
*/


// gives functionality to side bar/files to make them open the different 
// sections in the portfolio
function OpenFile(sectionId){
    var section = document.getElementById(sectionId);
    if (section.style.display == "none" || section.style.display == "") {
        section.style.display = "block";
    }
}

// gives functionality to files x button to close the file
function CloseFile(sectionId){
    var section = document.getElementById(sectionId);
    section.style.display = "none";

}

// gives functionality to move between different sections in portfolio
function ToggleSection(sectionId, sectionTabId){
    var section = document.getElementById(sectionId);
    var sectionTab =  document.getElementById(sectionTabId);

    if (section.style.display == "none" || section.style.display == "") {
        section.style.display = "grid";
    } else {
        section.style.display = "none";
    }

    if (sectionTab.style.display == "none" || sectionTab.style.display == "") {
        sectionTab.style.display = "inline-block";
    } else {
        sectionTab.style.display = "none";
    }
}