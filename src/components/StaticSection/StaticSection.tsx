import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import { Navigation } from '../Navigation';

import './StaticSection.scss';

export const StaticSection = () => {
  return (
    <>
      <section className="static">
        <header className="static__header">
          <Link to="/" className="static__img-link">
            <img className="static__logo" src={logo} alt="Page logo" />
          </Link>

          <h1 className="static__title">Hi!👋</h1>

          <p className="static__text">
            Welcome to MacPaw Bootcamp 2023
          </p>
        </header>

        <h2 className="static__subtitle">
          Lets start using The Cat API
        </h2>

        <Navigation />
      </section>
    </>
  );
}
