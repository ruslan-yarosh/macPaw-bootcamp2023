import React from 'react';

import {ReactComponent as Back} from '../../assets/icons/back.svg';
import './CurrentPage.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
  pageName: string,
}

export const CurrentPage: React.FC<Props> = ({ pageName }) => {
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

      <span className="current-page__name">{pageName}</span>
    </div>
  );
}
