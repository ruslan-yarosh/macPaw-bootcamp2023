import React from 'react';

import {ReactComponent as Back} from '../../assets/icons/back.svg';
import './CurrentPage.scss';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  pageName: string,
  breedId?: string,
}

export const CurrentPage: React.FC<Props> = ({ pageName, breedId = null }) => {
  const navigate = useNavigate();

  return (
    <div className="current-page">
      <button 
        type="button" 
        className="current-page__back"
        onClick={() => navigate(-1)}
      >
        <Back />
      </button>

      <span className={classNames('current-page__name', {
        'current-page__name--not-active': breedId,
      })}>
        {pageName}
      </span>

      {breedId && (
        <span className="current-page__currentId">
          {breedId}
        </span>
      )}
    </div>
  );
}
