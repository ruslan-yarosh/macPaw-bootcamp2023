import React from 'react';

import {ReactComponent as Back} from '../../assets/icons/back.svg';
import './CurrentPage.scss';

type Props = {
  pageName: string,
}

export const CurrentPage: React.FC<Props> = ({ pageName }) => {
  return (
    <div className="current-page">
      <button type="button" className="current-page__back">
        <Back />
      </button>

      <span className="current-page__name">{pageName}</span>
    </div>
  );
}
