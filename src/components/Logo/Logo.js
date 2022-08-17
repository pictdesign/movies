import { Link } from 'react-router-dom';
import logoSrc from '../../images/logo.svg';
import './Logo.css'

const Logo = ({className}) => {
  return (
    <Link to="/" className={className}>
      <img className='logo' src={logoSrc} alt="Логотип" />
    </Link>
  );
};

export default Logo;
