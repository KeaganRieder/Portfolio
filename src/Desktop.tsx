import './styles/desktop/Desktop.css';
import AppShortcut from './componets/application/Shortcut';
import AboutMe from './componets/about_me/AboutMe';

import emailIcon from './assets/apps/email.png';
import githubIcon from './assets/apps/github.png';
import linkedinIcon from './assets/apps/linkedin.png';
// import textdocIcon from './assets/apps/text_doc.png';
// import Application from './componets/application/Application';

function Desktop() {

  const TaskBar = (
    <div id='taskbar' className='taskbar'> 
    
    </div>
  )

  const shortcutContainer = (
    <section id='shortcuts' className='shortcutContainer'>
      <AppShortcut
        appInfo={{ name: 'email', iconSrc: emailIcon, }}

        onClick={() => { window.open("mailto:'kagan@rieder.ca'", "_blank") }
        }
      />
       <AppShortcut
        appInfo={{ name: 'linkedin', iconSrc: linkedinIcon, }}

        onClick={() => { window.open("https://www.linkedin.com/in/keagan-rieder/", "_blank") }
        }
      />
       <AppShortcut
        appInfo={{ name: 'github', iconSrc: githubIcon, }}

        onClick={() => { window.open("https://github.com/KeaganRieder", "_blank") }
        }
      />
    </section>
  )
  return (
    <>
      <div id='desktop' className='desktop'>
        {shortcutContainer}
       {/* <Application appInfo={{ name: 'About_Me', iconSrc: textdocIcon, }} visible={true} children={undefined}>
        </Application> */}
        <AboutMe />
      </div>
      {TaskBar}
       

    </>

  )
}

export default Desktop
