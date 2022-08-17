import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="container portfolio">
      <h3 className="portfolio__heading">Portfolio</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://github.com/Yurikze/react-mesto-api-full"
            className="portfolio__link"
          >
            Одностраничное приложение
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://yurikze.github.io/russian-travel/"
            className="portfolio__link"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/Yurikze/premium-car"
            className="portfolio__link"
          >
            Статичный сайт
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
