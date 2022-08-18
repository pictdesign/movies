import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="container portfolio">
      <h3 className="portfolio__heading">Portfolio</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://github.com/pictdesign/react-mesto-api-full"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://pict.design"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://pictdesign.github.io/russian-travel/"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
