import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/useForm';
import './Profile.css';

const Profile = ({ onLogout, onUpdate, success, clearSuccess }) => {
  const { name, email } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } =
    useFormWithValidation();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setValues({ name, email });
  }, [setValues, name, email]);

  useEffect(() => {
    if (success) {
      setTimeout(clearSuccess, 2000)
    }
  }, [success, clearSuccess]);

  const formEvtHandler = (e) => {
    e.preventDefault();
    if (isEditMode) {
      onUpdate(values);
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }
  };

  const formBtn = isEditMode ? (
    <button
      type="submit"
      className="profile__submit"
      disabled={!isValid || (values.name === name && values.email === email)}
    >
      Сохранить
    </button>
  ) : (
    <button className="profile__submit">Редактировать</button>
  );

  return (
    <section className="profile">
      <h1 className="profile__headline">Привет, {name}!</h1>
      <form className="profile__form" onSubmit={formEvtHandler}>
        <div className="profile__input-container">
          <span className="profile__input-span">Имя</span>
          <input
            name="name"
            value={values.name || ''}
            className="profile__input"
            type="text"
            placeholder="Введите имя"
            disabled={!isEditMode}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            required
          />
          <span className="profile__input-error">{errors.name}</span>
        </div>
        <div className="profile__input-container">
          <span className="profile__input-span">E-mail</span>
          <input
            name="email"
            value={values.email || ''}
            className="profile__input"
            type="email"
            placeholder="Введите email"
            disabled={!isEditMode}
            onChange={handleChange}
            required
          />
          <span className="profile__input-error">{errors.email}</span>
        </div>

        {formBtn}
        <p
          className={`profile__form-success ${
            success && 'profile__form-success_visible'
          }`}
        >
          Сохранено!
        </p>
      </form>
      <button className="profile__logout" onClick={onLogout}>
        Выйти из аккаунта
      </button>
    </section>
  );
};

export default Profile;
