import './Loader.scss';

import {ReactComponent as LoaderIcon } from '../../assets/Loader.svg';

export const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__content">
        <LoaderIcon />
      </div>
    </div>
  )
}