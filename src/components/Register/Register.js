import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './Register.css';

const Register = ({ onRegister, error, clearError }) => {
  const inputs = [
    {
      id: 'name',
      label: 'Имя',
      name: 'name',
      type: 'text',
      placeholder: 'Имя',
      required: true,
      pattern: '[a-zA-Zа-яА-Я -]{2,20}',
    },
    {
      id: 'email',
      label: 'E-mail',
      name: 'email',
      type: 'email',
      placeholder: 'E-mail',
      required: true,
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
    },
    {
      id: 'password',
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
      required: true,
      minLength: 2
    },
  ];

  return (
    <section className="register">
      <Logo className="register__logo" />
      <h1 className="register__heading">Добро пожаловать!</h1>
      <Form
        inputs={inputs}
        btnText="Зарегистрироваться"
        onSubmit={onRegister}
        error={error}
        clearError={clearError}
      />
      <p className="register__text">
        Уже зарегистрированы?{' '}
        <Link className="register__link" to="/signin">
          Войти
        </Link>
      </p>
    </section>
  );
};

export default Register;
