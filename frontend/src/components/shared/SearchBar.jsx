import PropTypes from "prop-types";
import { Search, X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
}) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="search-bar">
      <Search
        size={18}
        className="search-bar-icon"
      />

      <input
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className="search-bar-input"
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

      {value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SearchBar;