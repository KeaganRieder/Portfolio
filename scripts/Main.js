/*
--------------------------------------------------------------------------
    main js file fo rmy portfolio site, it handles bring 
   other js scripts together along with other things and creating
   the site
--------------------------------------------------------------------------
*/
import Desktop from './computer/Desktop.js';

/*
--------------------------------------------------------------------------
    Variables and classes
--------------------------------------------------------------------------
*/
var desktop = new Desktop();

/*
--------------------------------------------------------------------------
    executing and finalizing set up
--------------------------------------------------------------------------
*/

$(document).ready(function () {

    desktop.createDesktop();

});
