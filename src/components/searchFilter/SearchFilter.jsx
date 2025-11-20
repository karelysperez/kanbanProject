import { useRef } from "react";
import './SearchFilter.css';

export const SearchFilter = ({ onFilterChange }) => {
    const inputRef = useRef(null);

    const handleFilterChange = () => {
        const value = inputRef.current?.value ?? "";
        onFilterChange(value);
    }

    const handleClearClick = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        onFilterChange("");
    }

    return (
        <div className="search-filter">
            <input
                className="search-term"
                type="text"
                placeholder="Search tasks by title..."
                ref={inputRef}

            />


            <button className="filter-button" onClick={handleFilterChange}>Filter</button>

            <button className="clear-button" onClick={handleClearClick}>Clear</button>

        </div>
    );
}