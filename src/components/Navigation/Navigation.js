import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ className = '', isLoggedIn }) => {
  const navClassNames = `navigation ${className}`;

  if (isLoggedIn) {
    return (
      <nav className={navClassNames}>
        <ul className="navigation__links navigation__links_place_drawer">
          <li className="navigation__links-item navigation__links-item_to_main">
          <NavLink
              className="navigation__link navigation__link_place_drawer"
              to="/"
            >
              Главная
            </NavLink>
          </li>
          <li className="navigation__links-item">
            <NavLink
              className="navigation__link navigation__link_place_drawer"
              to="/movies"
            >
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__links-item">
            <NavLink
              className="navigation__link navigation__link_place_drawer"
              to="/saved-movies"
            >
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li className="navigation__links-item">
          <NavLink to="/signup" className="navigation__link">
            Регистрация
          </NavLink>
        </li>
        <li className="navigation__links-item">
          <NavLink
            to="/signin"
            className="navigation__link navigation__link_type_signin"
          >
            Войти
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
