import type { SearchBarProps } from "./types";

/**
 * Controlled text input for filtering/searching content elsewhere in the
 * app. Reports lowercased query text on every keystroke via onSearchChange,
 * and optionally fires onSearchSubmit when Enter is pressed.
 */
const SearchBar: React.FC<SearchBarProps> = ({
    onSearchChange, onSearchSubmit, placeholder = "Search...", value, ref
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        onSearchChange(query);
    };

    // Enter submits the current query, mirroring the lowercasing done on change.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && onSearchSubmit) {
            const query = (event.currentTarget.value || "").toLowerCase();
            onSearchSubmit(query);
        }
    };
    
    return (
        <input className="searchbar"
            type="text"
            placeholder={placeholder}
            value={value ?? ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={ref}
        />
        
    );
};

export default SearchBar;