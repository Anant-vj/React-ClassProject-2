import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange, placeholder = "Search companies or roles..." }) => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', display: 'flex' }}>
        <FiSearch />
      </div>
      <input
        type="text"
        className="form-input"
        style={{ paddingLeft: '2.5rem', borderRadius: '100px', backgroundColor: 'rgba(23, 25, 35, 0.7)', backdropFilter: 'blur(10px)' }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
