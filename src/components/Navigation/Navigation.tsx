import voting from '../../assets/images/voting.png';
import breeds from '../../assets/images/breeds.png';
import gallery from '../../assets/images/gallery.png';

import './Navigation.scss';

export const Navigation = () => {
  return (
    <nav className="nav">
      <div className="nav__card">
        <a href="/" className="nav__link">
          <div
            className="nav__img-container nav__img-container--voting"
          >
            <img className="nav__img" src={voting} alt="Voting nav" />
          </div>

          <span className="nav__name">Voting</span>
        </a>
      </div>

      <div className="nav__card">
        <a href="/" className="nav__link">
          <div
            className="nav__img-container nav__img-container--breeds"
          >
            <img className="nav__img" src={breeds} alt="Breeds nav" />
          </div>

          <span className="nav__name">Breeds</span>
        </a>
      </div>

      <div className="nav__card">
        <a href="/" className="nav__link">
          <div
            className="nav__img-container nav__img-container--gallery"
          >
            <img className="nav__img" src={gallery} alt="Gallery nav" />
          </div>

          <span className="nav__name">Gallery</span>
        </a>
      </div>
    </nav>
  );
}
