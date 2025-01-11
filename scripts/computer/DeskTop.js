import Screen from "./Screen.js";
/*
   Desktop is the main class which holds the brunt of the site,
   managing various things like creating and organizing.
*/
class Desktop  {
    constructor() {
        this.screen =new Screen();
    }

    //returns the desktops screen 
    GetScreen(){
        // return this.screen;
    }
   
    //creates all elements that are to be displayed on the desktop
    createDesktop() {
       this.screen.CreateScreenElements();
    }

    //resizes elements on desktop
    resize(){}
}

export default Desktop;