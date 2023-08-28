import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import './PageControlBtns.scss';
import {ReactComponent as Prev} from '../../assets/icons/prev.svg';
import {ReactComponent as Next} from '../../assets/icons/next.svg';

type Props = {
  length: number,
};

export const PageControlBtns: React.FC<Props> = ({ length }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '5';


  const handleBtnClick = useCallback((flag: number) => {
    searchParams.set('page',
      flag 
        ? (+page + 1).toString()
        : (+page - 1).toString()
    );

    const newSearchParams = searchParams.toString();

    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams, page]);

  return (
    <div className="control">
      <button 
        className="control__btn"
        type="button"
        disabled={+page === 1}
        onClick={() => handleBtnClick(0)}
      >
        <Prev />
        Prev
      </button>

      <button 
        className="control__btn"
        disabled={length < +perPage}
        type="button"
        onClick={() => handleBtnClick(1)}
      >
        Next
        <Next />
      </button>
  </div>
  )
}