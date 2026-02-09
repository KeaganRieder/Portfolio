import type { SearchBarProps } from "./definition";

const SearchBar: React.FC<SearchBarProps> = ({ 
    onSearchChange, onSearchSubmit, placeholder = "Search...", value, ref
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        onSearchChange(query);
    };

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