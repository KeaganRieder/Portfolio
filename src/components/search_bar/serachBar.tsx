import type { SearchBarProps } from "./definition";

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, placeholder = "Search..." }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const query = event.target.value.toLowerCase();
        onSearchChange(query);
    };

    return (
        <input
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
            style={{ padding: '10px', fontSize: '16px', width: '300px' }}
        />
    );
};

export default SearchBar;