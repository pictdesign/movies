import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className='not-found__headline'>404</h1>
      <p className='not-found__text'>Страница не найдена</p>
      <Link className='not-found__back' to="/">Назад</Link>
    </div>
  );
};

export default NotFound;
