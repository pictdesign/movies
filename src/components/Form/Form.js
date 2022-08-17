import { useFormWithValidation } from '../../utils/useForm';
import './Form.css';

const Form = ({ inputs, btnText, onSubmit, className = '', error, clearError }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const formClassnames = `form ${className}`;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
  };

  const handleCloseError = (evt) => {
    evt.preventDefault()
    clearError()
  }

  return (
    <form className={formClassnames} onSubmit={handleSubmit}>
      <div className="form__inputs">
        {inputs.map((input) => (
          <div className="form__input-container" key={input.id}>
            <p className="form__label">{input.label}</p>
            <input
              name={input.name}
              value={values[input.name] || ''}
              onChange={handleChange}
              className="form__input"
              type={input.type}
              required={input.required}
              pattern={input.pattern}
              minLength={input.minLength}
            />
            <span className="form__error">{errors[input.name]}</span>
          </div>
        ))}
      </div>
      {error && (
        <button onClick={handleCloseError} className="form__submit-error">
          Что-то пошло не так... {error}
          <span className='form__error-close'>
            <div></div>
            <div></div>
          </span>
        </button>
      )}
      <button className="form__submit" type="submit" disabled={!isValid}>
        {btnText}
      </button>
    </form>
  );
};

export default Form;
