// defines functions used for the sidebar

// toggles the visibility of the section with the given id
function ToggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}