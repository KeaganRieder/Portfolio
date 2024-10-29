/* 
-----------------------------------------------------------
defines functionality for navigating the site like:
- hiding and showing windows/docs
-----------------------------------------------------------
*/

// toggles a content section in the site on/off
function ToggleWindow(id) {
    var window = document.getElementById(id);
    if (window.style.display === "none" || window.style.display === "") {
        window.style.display = "block";
    } else {
        window.style.display = "none";
    }
}

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