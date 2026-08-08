import React, { useEffect, useState } from "react";

import './desktop.css';
import { ApplicationRegistry, type AppLookupResult } from "../app_registry/appRegistry";
import SearchBar from "../../components/search_bar/searchBar";

/**
 * Root component for the simulated desktop OS UI. Composes the desktop
 * surface (shortcut icons + all registered app windows, via ApplicationRegistry)
 * together with the taskbar (search bar, live clock, and open-app shortcuts).
 */
export const Desktop: React.FC = () => {

    const [currentTime, setCurrentTime] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<AppLookupResult[]>([]);
    const [searchResultsContainerOffset, setSearchResultsContainerOffset] = React.useState<{ left: number; bottom: number }>({ left: 0, bottom: 0 });
    const appRegistry = ApplicationRegistry();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    /** Formats a Date as a 12-hour HH:MM string for the taskbar clock. */
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    /** Formats a Date as a long-form date string for the taskbar clock. */
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    /** Builds the taskbar's app search box, wiring it up to the app registry's search/open API. */
    const taskbarSearchBar = () => {
        const handleSearchChange = (query: string) => {
            setSearchQuery(query);
            setSearchResults(appRegistry.getSearchResults(query));
        };
        const clearSearch = () => {
            setSearchQuery("");
            setSearchResults([]);
        };
        const handleSearchSubmit = (query: string) => {
            const wasOpened = appRegistry.searchAndOpenApp(query || searchQuery);
            if (wasOpened) {
                clearSearch();
            }
        };
        const handleResultClick = (result: AppLookupResult) => {
            appRegistry.searchAndOpenApp(result);
            clearSearch();
        };

        // Ref callback used only to measure the search bar once (offset still at its
        // initial 0,0) so the results dropdown can be positioned just above it.
        const mapResultContainerOffset = (searchBarElement: HTMLInputElement | null) => {
            if (searchBarElement && searchResultsContainerOffset.left === 0 && searchResultsContainerOffset.bottom === 0) {
                const rect = searchBarElement.getBoundingClientRect();
                setSearchResultsContainerOffset({ left: 0, bottom: rect.height + 5 });

            }
        }

        return (
            <div id="taskbar-searchbar-container">
                <SearchBar
                    placeholder="Search apps..."
                    value={searchQuery}
                    onSearchChange={handleSearchChange}
                    onSearchSubmit={handleSearchSubmit}
                    ref={mapResultContainerOffset}
                />
                {
                    searchResults.length > 0 &&
                    <div id="taskbar-search-results-container" style={{ left: searchResultsContainerOffset.left, bottom: searchResultsContainerOffset.bottom }}>
                        {searchResults.map(result => (
                            <button
                                key={`${result.type}:${result.id}`}
                                className="search-result"
                                onClick={() => handleResultClick(result)}
                            >
                                {result.name}
                            </button>
                        ))}
                    </div>}
            </div>
        );
    }

    /** Assembles the taskbar section: search bar, clock, and the container for open-app shortcuts. */
    const createTaskbar = () => {
        const createClock = () => {
            return (
                <div id="taskbar-clock">
                    <div className='time'>{formatTime(currentTime)}</div>
                    <div className='date'>{formatDate(currentTime)}</div>
                </div>
            );
        };
        // Empty div whose DOM node is handed to the registry; it portals/renders
        // shortcut buttons for currently open apps directly into this element.
        const createShortcutContainer = () => {
            return (
                <div id="taskbar-shortcut-container"
                    ref={(element: HTMLElement | null) => appRegistry.setTaskbarShortcutContainer(element)}
                >
                </div>
            );
        };

        return (
            <section id="taskbar">
                {taskbarSearchBar()}
                {createClock()}
                {createShortcutContainer()}

            </section>
        );
    };

    /**
     * Assembles the main desktop surface: registers the app-window container and the
     * desktop-shortcut container with the app registry (via refs), then renders every
     * externally-registered app plus all apps the registry currently knows about.
     */
    const createDesktopContainer = () => {
        return (
            <>
                <section id="app-container" ref={(element: HTMLElement | null) => appRegistry.setAppContainer(element)}>
                    <section id="shortcut-container">
                        <div className="shortcut-scroll-container"
                        ref={(element: HTMLElement | null) => { appRegistry.setShortcutContainer(element); }}/>
                    </section>
                </section>
                {appRegistry.CreateExternalApps()}
                {appRegistry.renderAll()}
            </>
        );
    };

    return (
        <section id="desktop" className="desktop">
            {createDesktopContainer()}
            {createTaskbar()}
        </section>
    );
};
