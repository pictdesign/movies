import { useCallback, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { ReactComponent as SearchIcon } from '../../images/search-icon.svg';
import './SearchForm.css';

const SearchForm = ({ onSearch, cacheValue, shortCache }) => {
  const [search, setSearch] = useState(cacheValue);
  const [isShort, setIsShort] = useState(shortCache === 'true' ? true : false);
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search, isShort);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSwitchChange = useCallback(() => {
    setIsShort(!isShort);
  }, [isShort]);

  return (
    <section className="search">
      <div className="search__form-container">
        <form className="search__form" onSubmit={handleSearch}>
          <span className="search__icon">
            <SearchIcon />
          </span>
          <input
            value={search || ''}
            onChange={handleInputChange}
            className="search__input"
            type="text"
            placeholder="Фильм"
            required
          />
          <button type="submit" className="search__btn">
            <SearchIcon />
          </button>
        </form>
        <div className="search__filter">
          <FilterCheckbox onChange={handleSwitchChange} isShort={isShort} />
          <span className="search__filter-text">Короткометражки</span>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;
