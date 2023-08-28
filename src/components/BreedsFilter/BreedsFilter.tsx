import React, { useCallback, useEffect, useState } from 'react';

import './BreedsFilter.scss';
import {ReactComponent as DescIcon} from '../../assets/icons/Desc.svg';
import {ReactComponent as AscIcon} from '../../assets/icons/Asc.svg';
import { request } from '../../api/fetch';
import { useSearchParams } from 'react-router-dom';

type BreedNames = {
  id: string,
  name: string,
}

export const BreedsFilter: React.FC = () => {
  const [breedNames, setBreedNames] = useState<BreedNames[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentBreed = searchParams.get('breed') || '';
  const perPage = searchParams.get('perPage') || '5';

  const handleGetAllBreeds = useCallback(async () => {
    try {
      const res = await request<BreedNames[]>('breeds');

      setBreedNames(res);
    } catch {
      console.log('Error');
    }
  }, []);

  const handleSelectChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const newParam = event.target.value;

    if (newParam === '') {
      searchParams.delete(event.target.name);
    } else {
      searchParams.set(event.target.name, newParam);
      searchParams.set('page', '1');
    }

    const newSearchParams = searchParams.toString();

    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  const handleBtnClick = useCallback((value: string) => {
    searchParams.set('order', value);
    searchParams.set('page', '1');

    const newSearchParams = searchParams.toString();

    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    handleGetAllBreeds();
  }, [handleGetAllBreeds]);

  return (
    <div className="filters">
      <select 
        name="breed" 
        className="filters__select filters__select--wide"
        value={currentBreed} 
        onChange={handleSelectChange}
      >
        <option value="">All breeds</option>
        {breedNames.map(el => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>

      <select 
        name="perPage"
        className="filters__select filters__select--short"
        value={perPage}
        onChange={handleSelectChange}
      >
        <option value="5">Limit: 5</option>
        <option value="10">Limit: 10</option>
        <option value="15">Limit: 15</option>
        <option value="20">Limit: 20</option>
      </select>

      <button 
        className="filters__order"
        type="button" 
        onClick={() => handleBtnClick('DESC')}
      >
        <DescIcon />
      </button>

      <button 
        className="filters__order"
        type="button" 
        onClick={() => handleBtnClick('ASC')}
      >
        <AscIcon />
      </button>
    </div>
  )
}