import girlAndPet from '../../assets/images/girl-and-pet.png';

import './HomeSection.scss';

export const HomeSection = () => {
  return (
    <section className="home">
        <img 
          src={girlAndPet} 
          alt="Girl and pet"
          className="home__img"
        />
        <div className="home__content" />
    </section>
  );
};