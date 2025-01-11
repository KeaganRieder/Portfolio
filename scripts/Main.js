/*
--------------------------------------------------------------------------
    main js file fo rmy portfolio site, it handles bring 
   other js scripts together along with other things and creating
   the site
--------------------------------------------------------------------------
*/
import Screen from "./computer/Screen.js";


/*
--------------------------------------------------------------------------
    Variables and classes
--------------------------------------------------------------------------
*/
var screen = new Screen();

/*
--------------------------------------------------------------------------
    executing and finalizing set up
--------------------------------------------------------------------------
*/

$(document).ready(function () {

    screen.CreateScreenElements();

});
