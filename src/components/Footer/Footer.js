import './Footer.css';

const Footer = () => {
  return (
    <footer className="container footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__meta">
        <p className="footer__meta-text">&#169; 2022</p>
        <ul className="footer__links">
          <li className="footer__links-item">
            <a className="footer__link">Яндекс.Практикум</a>
          </li>
          <li className="footer__links-item">
            <a className="footer__link">Github</a>
          </li>
          <li className="footer__links-item">
            <a className="footer__link">Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
