import voting from '../../assets/images/voting.png';
import breeds from '../../assets/images/breeds.png';
import gallery from '../../assets/images/gallery.png';

import './Navigation.scss';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Navigation = () => {
  const location = useLocation();

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
            className={classNames(
              'nav__img-container', 'nav__img-container--voting', 
              {
                'nav__img-container--active': location.pathname === '/voting'
              }
            )}
          >
            <img className="nav__img" src={voting} alt="Voting nav" />
          </div>

          <span className={classNames('nav__name', { 
            'nav__name--active': location.pathname === '/voting'
          })}>
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
            className={classNames(
              'nav__img-container', 'nav__img-container--breeds', 
              {
                'nav__img-container--active': location.pathname === '/breeds'
              }
            )}
          >
            <img className="nav__img" src={breeds} alt="Breeds nav" />
          </div>

          <span className={classNames('nav__name', { 
            'nav__name--active': location.pathname === '/breeds'
          })}>
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
            className={classNames(
              'nav__img-container', 'nav__img-container--gallery', 
              {
                'nav__img-container--active': location.pathname === '/gallery'
              }
            )}
          >
            <img className="nav__img" src={gallery} alt="Gallery nav" />
          </div>

          <span className={classNames('nav__name', { 
            'nav__name--active': location.pathname === '/gallery'
          })}>
            Gallery
          </span>
        </NavLink>
      </div>
    </nav>
  );
}
