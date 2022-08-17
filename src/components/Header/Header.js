import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import SideDrawer from '../SideDrawer/SideDrawer';
import './Header.css';

const Header = ({isLoggedIn}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { pathname } = useLocation();

  const classNames = `header ${pathname === '/' ? 'header_isHome' : ''}`;

  const handleShowDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <header className={classNames}>
      <Logo />
      <Navigation className="header__navigation" isLoggedIn={isLoggedIn} />
      {isLoggedIn && (
        <button onClick={handleShowDrawer} className="header__burger"></button>
      )}
      {isLoggedIn && (
        <NavLink
          className="header__account header__account_place_nav"
          to="/profile"
        >
          Аккаунт
        </NavLink>
      )}
      {isDrawerOpen && isLoggedIn && (
        <SideDrawer onCloseDrawer={handleCloseDrawer}>
          <Navigation isLoggedIn={isLoggedIn} />
          <NavLink className="header__account" to="/profile">
            Аккаунт
          </NavLink>
        </SideDrawer>
      )}
    </header>
  );
};

export default Header;
