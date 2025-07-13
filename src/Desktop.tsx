import { useState, useEffect } from 'react';
import AppShortcut from './componets/application/Shortcut';
import AboutMe from './componets/about_me/AboutMe';
import Projects from './componets/projects/Projects';
import './styles/desktop/Desktop.css';
import './styles/desktop/Taskbar.css';

import emailIcon from './assets/apps/email.png';
import githubIcon from './assets/apps/github.png';
import linkedinIcon from './assets/apps/linkedin.png';

function Desktop() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {

      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const TaskBar = (
    <div id='taskbar' className='taskbar'>
      <section className='clock'>
        <div className='time'>{formatTime(currentTime)}</div>
        <div className='date'>{formatDate(currentTime)}</div>
      </section>

      <section id='taskbar-shortcuts' className='taskbar-shortcuts-container'>
        <section className='taskbar-shortcuts-start'>
          <img src={emailIcon} alt='start' />
          <span>Start</span>
        </section>

        {/* <div className='taskbar-shortcut-active'>hey</div> */}
      </section>

    </div>
  )

  const shortcutContainer = (
    <section id='shortcuts' className='shortcut-container'>
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
        <AboutMe />
        <Projects />
      </div>
      {TaskBar}


    </>

  )
}

export default Desktop
