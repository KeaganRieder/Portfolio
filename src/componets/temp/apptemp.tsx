import React, { useState, useRef, useEffect } from 'react';

// TypeScript imports (remove .js extensions)
/*
import ContainerElement from "../elements/ContainerElement";
import ImgElement from "../elements/ImgElement";
import { EmbeddedElement, IframeElement } from "../elements/EmbeddedElement";
import { BodyTextElement, HeaderTextElement } from "../elements/TextElements";
import { AppStyle } from "../site_styles/ComputerAppStyles";
import { DeskTopStyles } from "../site_styles/DesktopStyles";
import { appColors, deskTopColors } from "../site_styles/SiteColors";
import { AppContent } from "../content/AppContent";
*/

// Type definitions
interface AppAttributes {
  name: string;
  text: string;
  imgSrc: string;
}

interface AppInfo {
  name: string;
  text: string;
}

// Removed unused AppParents interface - no longer needed in React approach

interface ContentElement {
  type: string;
  content: any;
  style: any;
}

interface AppShortcutProps {
  attributes: AppAttributes;
  onOpen: () => void;
}

interface ComputerAppProps {
  appInfo: AppInfo;
  content: ContentElement[];
  onClose?: () => void;
  // Composition props for customization
  customRenderer?: (element: ContentElement, index: number) => React.ReactNode;
  customStyles?: {
    container?: React.CSSProperties;
    header?: React.CSSProperties;
    content?: React.CSSProperties;
  };
  customActions?: {
    onOpen?: () => void;
    onResize?: () => void;
    beforeClose?: () => boolean; // Return false to prevent closing
  };
}

/**
 * AppShortcut Component - React conversion of AppShortcut class
 * Renders a clickable shortcut that opens an app
 */
const AppShortcut: React.FC<AppShortcutProps> = ({ attributes, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div 
      className="app-shortcut"
      onClick={onOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        // Apply DeskTopStyles.shortcuts.body styles here
        backgroundColor: isHovered ? 'hover-color' : 'base-color', // Replace with actual colors
        cursor: 'pointer'
      }}
    >
      <img 
        src={attributes.imgSrc} 
        alt={attributes.name}
        // Apply DeskTopStyles.shortcuts.img styles here
      />
      <h2 
        // Apply DeskTopStyles.shortcuts.label styles here
      >
        {attributes.text}
      </h2>
    </div>
  );
};

/**
 * ComputerApp Component - React conversion of ComputerApp class
 * Base component for app windows with header, content, and close functionality
 */
const ComputerApp: React.FC<ComputerAppProps> = ({ 
  appInfo, 
  content, 
  onClose,
  customRenderer,
  customStyles = {},
  customActions = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const appContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle resize on mount and window resize
    const handleResize = () => {
      resizeApp();
      if (customActions.onResize) {
        customActions.onResize();
      }
    };

    window.addEventListener('resize', handleResize);
    resizeApp();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [customActions]);

  const resizeApp = () => {
    if (appContainerRef.current) {
      const container = appContainerRef.current;
      container.style.width = '95%';
      container.style.height = 'calc(90% - 26px)';
      container.style.top = '24px';
      container.style.left = '40px';
    }
  };

  const openApp = () => {
    setIsVisible(true);
    if (customActions.onOpen) {
      customActions.onOpen();
    }
  };

  const closeApp = () => {
    // Check if custom beforeClose prevents closing
    if (customActions.beforeClose && !customActions.beforeClose()) {
      return;
    }
    
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const handleCloseMouseEnter = () => setIsCloseHovered(true);
  const handleCloseMouseLeave = () => setIsCloseHovered(false);

  const renderContent = () => {
    return content.map((element, index) => {
      // Use custom renderer if provided
      if (customRenderer) {
        const customElement = customRenderer(element, index);
        if (customElement) return customElement;
      }

      // Default rendering logic
      switch (element.type) {
        case "Img":
          return (
            <img 
              key={index}
              src={element.content.imgSrc}
              alt={element.content.name || ''}
              // Apply element.style here
            />
          );
        
        case "bodyText":
          return (
            <p 
              key={index}
              // Apply element.style here
            >
              {element.content.text}
            </p>
          );
        
        case "embedded":
          return (
            <div 
              key={index}
              // Apply element.style here
              dangerouslySetInnerHTML={{ __html: element.content.html }}
            />
          );
        
        case "iframe":
          return (
            <iframe
              key={index}
              src={element.content.src}
              title={element.content.title || `iframe-${index}`}
              // Apply element.style here
              style={{ 
                width: '100%', 
                height: '100%',
                border: 'none'
              }}
            />
          );
        
        default:
          console.error(`${element.type} not found`);
          return null;
      }
    });
  };

  if (!isVisible) {
    return (
      <AppShortcut 
        attributes={{
          name: appInfo.name,
          text: appInfo.text,
          imgSrc: '/assets/nav_icons/folder.png' // Default icon
        }}
        onOpen={openApp}
      />
    );
  }

  return (    <div 
      ref={appContainerRef}
      className="computer-app"
      style={{
        position: 'absolute',
        ...customStyles.container,
        // Apply AppStyle.mainContainer styles here
        display: isVisible ? 'block' : 'none'
      }}
    >
      {/* Header Container */}      <div 
        className="app-header"
        style={{
          ...customStyles.header,
          // Apply AppStyle.header.container styles here
        }}
      >
        <h2 
          className="app-title"
          // Apply AppStyle.header.text styles here
        >
          {appInfo.text}
        </h2>
        
        {/* Close Button */}
        <img
          src="/assets/nav_icons/close_button.png" // Replace with AppContent.closeButton
          alt="Close"
          className="close-button"
          onClick={closeApp}
          onMouseEnter={handleCloseMouseEnter}
          onMouseLeave={handleCloseMouseLeave}
          style={{
            cursor: 'pointer',
            // Apply AppStyle.header.closeButton styles here
            backgroundColor: isCloseHovered ? 'hover-color' : 'base-color' // Replace with actual colors
          }}
        />
      </div>

      {/* App Body */}
      <div 
        className="app-body"
        style={{
          ...customStyles.content,
          // Apply AppStyle.content.container styles here
        }}
      >
        <div 
          ref={contentContainerRef}
          className="content-container"
          // Apply AppStyle.content.scrollContainer styles here
          style={{
            overflowY: content.some(el => el.type === 'iframe' || el.type === 'embedded') ? 'hidden' : 'auto'
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Utility hook for managing multiple apps
export const useAppManager = () => {
  const [openApps, setOpenApps] = useState<Set<string>>(new Set());

  const openApp = (appName: string) => {
    setOpenApps(prev => new Set(prev).add(appName));
  };

  const closeApp = (appName: string) => {
    setOpenApps(prev => {
      const newSet = new Set(prev);
      newSet.delete(appName);
      return newSet;
    });
  };

  const isAppOpen = (appName: string) => {
    return openApps.has(appName);
  };

  return { openApp, closeApp, isAppOpen, openApps };
};
