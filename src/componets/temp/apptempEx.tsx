
// ==============================================
// EXAMPLE USAGE PATTERNS
// ==============================================

// Option 1: Composition Pattern (Recommended) - AboutMe App
interface AboutMeProps {
  userInfo: {
    name: string;
    bio: string;
    skills: string[];
    profileImage: string;
  };
}

const AboutMeApp: React.FC<AboutMeProps> = ({ userInfo }) => {
  // Custom renderer for About Me specific content
  const customAboutMeRenderer = (element: ContentElement, index: number) => {
    switch (element.type) {
      case "profileSection":
        return (
          <div key={index} className="profile-section">
            <img src={userInfo.profileImage} alt="Profile" className="profile-image" />
            <h3>{userInfo.name}</h3>
            <p>{userInfo.bio}</p>
          </div>
        );
      
      case "skillsList":
        return (
          <div key={index} className="skills-section">
            <h4>Skills</h4>
            <ul>
              {userInfo.skills.map((skill, skillIndex) => (
                <li key={skillIndex}>{skill}</li>
              ))}
            </ul>
          </div>
        );
      
      default:
        return null; // Let default renderer handle it
    }
  };

  const aboutMeContent: ContentElement[] = [
    { type: "profileSection", content: {}, style: {} },
    { type: "skillsList", content: {}, style: {} },
    { type: "bodyText", content: { text: "Additional information..." }, style: {} }
  ];

  const customStyles = {
    container: { 
      backgroundColor: '#f0f8ff',
      borderRadius: '10px'
    },
    header: { 
      backgroundColor: '#4682b4',
      color: 'white'
    },
    content: { 
      padding: '20px'
    }
  };

  const customActions = {
    onOpen: () => console.log('About Me app opened!'),
    onResize: () => console.log('About Me app resized!'),
    beforeClose: () => {
      // Ask for confirmation before closing
      return window.confirm('Are you sure you want to close About Me?');
    }
  };

  return (
    <ComputerApp
      appInfo={{ name: "AboutMe", text: "About Me" }}
      content={aboutMeContent}
      customRenderer={customAboutMeRenderer}
      customStyles={customStyles}
      customActions={customActions}
    />
  );
};

// Option 2: Hook-based Pattern for Shared Logic
const useAppBase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const appContainerRef = useRef<HTMLDivElement>(null);

  const openApp = () => setIsVisible(true);
  const closeApp = () => setIsVisible(false);
  const minimizeApp = () => setIsMinimized(!isMinimized);

  const resizeApp = (width = '95%', height = 'calc(90% - 26px)') => {
    if (appContainerRef.current) {
      const container = appContainerRef.current;
      container.style.width = width;
      container.style.height = height;
    }
  };

  return {
    isVisible,
    isMinimized,
    openApp,
    closeApp,
    minimizeApp,
    resizeApp,
    appContainerRef
  };
};

// Using the hook in a specialized component
const ResumeApp: React.FC = () => {
  const appBase = useAppBase();
  
  // Resume-specific logic
  const downloadResume = () => {
    console.log('Downloading resume...');
    // Implementation here
  };

  if (!appBase.isVisible) {
    return (
      <AppShortcut 
        attributes={{
          name: "Resume",
          text: "My Resume",
          imgSrc: '/assets/nav_icons/text_doc.png'
        }}
        onOpen={appBase.openApp}
      />
    );
  }

  return (
    <div 
      ref={appBase.appContainerRef}
      className="resume-app computer-app"
      style={{
        position: 'absolute',
        backgroundColor: '#ffffff',
        border: '2px solid #333',
        display: appBase.isVisible ? 'block' : 'none'
      }}
    >
      <div className="app-header resume-header">
        <h2>My Resume</h2>
        <div className="header-buttons">
          <button onClick={downloadResume}>Download PDF</button>
          <button onClick={appBase.minimizeApp}>-</button>
          <button onClick={appBase.closeApp}>×</button>
        </div>
      </div>
      
      <div className="app-body resume-content">
        {/* Resume-specific content here */}
        <div className="resume-section">
          <h3>Experience</h3>
          <p>Your work experience...</p>
        </div>
        <div className="resume-section">
          <h3>Education</h3>
          <p>Your education details...</p>
        </div>
      </div>
    </div>
  );
};

// Option 3: Higher-Order Component Pattern (Advanced)
interface WithAppWindowProps {
  appInfo: AppInfo;
  children: React.ReactNode;
  customStyles?: React.CSSProperties;
}

const withAppWindow = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P & WithAppWindowProps) => {
    const { appInfo, children, customStyles, ...componentProps } = props;
    const [isVisible, setIsVisible] = useState(false);

    return (
      <>
        {!isVisible && (
          <AppShortcut 
            attributes={{
              name: appInfo.name,
              text: appInfo.text,
              imgSrc: '/assets/nav_icons/folder.png'
            }}
            onOpen={() => setIsVisible(true)}
          />
        )}
        
        {isVisible && (
          <div 
            className="app-window"
            style={{ 
              position: 'absolute',
              ...customStyles 
            }}
          >
            <div className="app-header">
              <h2>{appInfo.text}</h2>
              <button onClick={() => setIsVisible(false)}>×</button>
            </div>
            
            <div className="app-content">
              <WrappedComponent {...(componentProps as P)} />
            </div>
          </div>
        )}
      </>
    );
  };
};

// Usage of HOC
const BasicPortfolio: React.FC<{ projects: string[] }> = ({ projects }) => (
  <div>
    <h3>My Projects</h3>
    {projects.map((project, index) => (
      <div key={index}>{project}</div>
    ))}
  </div>
);

const PortfolioApp = withAppWindow(BasicPortfolio);

// ==============================================
// EXPORTS
// ==============================================

export { 
  AppShortcut, 
  ComputerApp, 
  AboutMeApp, 
  ResumeApp, 
  PortfolioApp,
  useAppBase,
  withAppWindow
};