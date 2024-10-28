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