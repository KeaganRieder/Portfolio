//
// defines functions used for navigation the different sections of the site
// 

function ShowSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section.style.display == "none" || section.style.display == "") {
        section.style.display = "grid";
    }
}

function HideSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.style.display = "none";
}
