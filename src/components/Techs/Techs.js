import './Techs.css';

const Techs = () => {
  return (
    <section className="techs" id="tech">
      <div className="container">
        <h3 className="main__heading">Технологии</h3>
        <div className="techs__content">
          <h2 className="techs__heading">7 технологий</h2>
          <p className="techs__text">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className='techs__skills'>
            <li className='tech__skill'>HTML</li>
            <li className='tech__skill'>CSS</li>
            <li className='tech__skill'>JS</li>
            <li className='tech__skill'>React</li>
            <li className='tech__skill'>Git</li>
            <li className='tech__skill'>Express.js</li>
            <li className='tech__skill'>mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Techs;
