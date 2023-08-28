import voting from '../../assets/images/voting.png';
import breeds from '../../assets/images/breeds.png';
import gallery from '../../assets/images/gallery.png';

import './Navigation.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navigation = () => {
  return (
    <nav className="nav">
      <div className="nav__card">
        <NavLink 
          to="/voting" 
          className={({ isActive }) => classNames('nav__link', {
            'nav__link--active': isActive
          })}
        >
          <div
            className="nav__img-container nav__img-container--voting"
          >
            <img className="nav__img" src={voting} alt="Voting nav" />
          </div>

          <span className="nav__name">
            Voting
          </span>
        </NavLink>
      </div>

      <div className="nav__card">
        <NavLink 
          to="/breeds" 
          className={({ isActive }) => classNames('nav__link', {
            'nav__link--active': isActive
          })}
        >
          <div
            className="nav__img-container nav__img-container--breeds"
          >
            <img className="nav__img" src={breeds} alt="Breeds nav" />
          </div>

          <span className="nav__name">
            Breeds
          </span>
        </NavLink>
      </div>

      <div className="nav__card">
        <NavLink 
          to="/gallery" 
          className={({ isActive }) => classNames('nav__link', {
            'nav__link--active': isActive
          })}
        >
          <div
            className="nav__img-container nav__img-container--gallery"
          >
            <img className="nav__img" src={gallery} alt="Gallery nav" />
          </div>

          <span className="nav__name">
            Gallery
          </span>
        </NavLink>
      </div>
    </nav>
  );
}
