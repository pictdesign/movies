import profile from '../../images/portrait.JPG';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me container" id="student">
      <h3 className="main__heading about-me__heading">Студент</h3>
      <div className="about-me__content">
        <h2 className="about-me__title">Стас</h2>
        <h4 className="about-me__subtitle">Фронтенд-разработчик, 31 год</h4>
        <p className="about-me__text">
          Я родился в Качканаре - небольшом городке на севере Свердловской области. Живу в Красной Поляне, закончил факультет
          цветной металлургии УрфУ им. Б.Н. Ельцина. У меня есть жена и сын.
          Работаю в агентстве графического дизайна как менеджер проектов и 
          frontend-разработчик. В проекте использую React.js, React
          router, сервер написан на Express.
        </p>
        <ul className="about-me__socials">
          <li className="about-me__social-item">
            <a href="https://github.com/pictdesign" className="about-me__link">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <div className="about-me__avatar">
        <img className="about-me__img" src={profile} alt="Профиль" />
      </div>
    </section>
  );
};

export default AboutMe;
