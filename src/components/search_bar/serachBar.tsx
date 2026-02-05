import type { SearchBarProps } from "./definition";

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, placeholder = "Search..." }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const query = event.target.value.toLowerCase();
        onSearchChange(query);
    };

    return (
        <input className="searchbar"
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default SearchBar;