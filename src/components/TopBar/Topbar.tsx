import React, { useState } from 'react';

import {ReactComponent as SearchIcon} from '../../assets/icons/search.svg';
import {ReactComponent as LikeIcon} from '../../assets/icons/like.svg';
import {ReactComponent as FavIcon} from '../../assets/icons/fav.svg';
import {ReactComponent as DislikeIcon} from '../../assets/icons/dislike.svg';

import './Topbar.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';


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

      <NavLink 
        to="/likes" 
        className={({ isActive }) => classNames('topbar__link', {
           'topbar__link--active': isActive 
        })}
      >
        <LikeIcon />
      </NavLink>

      <NavLink 
        to="/favourites" 
        className={({ isActive }) => classNames('topbar__link', {
           'topbar__link--active': isActive 
        })}
      >
        <FavIcon />
      </NavLink>

      <NavLink 
        to="/dislikes" 
        className={({ isActive }) => classNames('topbar__link', {
           'topbar__link--active': isActive 
        })}
      >
        <DislikeIcon />
      </NavLink>
    </div>
  );
}
