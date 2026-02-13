import React, { useEffect, useState } from "react";

import './styles/desktop.css';
import { ApplicationRegistry, type AppLookupResult } from "./appRegistry";
import SearchBar from "../../components/search_bar/searchBar";

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

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

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

    const createTaskbar = () => {
        const createClock = () => {
            return (
                <div id="taskbar-clock">
                    <div className='time'>{formatTime(currentTime)}</div>
                    <div className='date'>{formatDate(currentTime)}</div>
                </div>
            );
        };
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
                {appRegistry.createAppsFromRegistry()}
                {appRegistry.createProjectsFromRegistry()}
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