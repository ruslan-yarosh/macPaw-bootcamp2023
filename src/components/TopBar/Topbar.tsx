import React, { useState } from 'react';

import {ReactComponent as SearchIcon} from '../../assets/icons/search.svg';
import {ReactComponent as LikeIcon} from '../../assets/icons/like.svg';
import {ReactComponent as FavIcon} from '../../assets/icons/fav.svg';
import {ReactComponent as DislikeIcon} from '../../assets/icons/dislike.svg';

import './Topbar.scss';


export const Topbar: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="topbar topbar--height topbar--margin">
      <form action="/" className="topbar__form">
        <input
          type="text"
          placeholder="Search for breeds by name"
          className="topbar__field"
          value={searchValue}
          onChange={handleChange}
        />

        <button type="submit" className="topbar__search-btn">
          <SearchIcon />
        </button>
      </form>

      <a href="/" className="topbar__link">
        <LikeIcon />
      </a>

      <a href="/" className="topbar__link">
        <FavIcon />
      </a>

      <a href="/" className="topbar__link">
        <DislikeIcon />
      </a>
    </div>
  );
}
