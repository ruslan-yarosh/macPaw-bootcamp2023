import React, { FormEvent, useCallback, useEffect, useState } from 'react';

import './GalleryFilters.scss';
import {ReactComponent as Update} from '../../assets/icons/update.svg';
import { request } from '../../api/fetch';
import { useSearchParams } from 'react-router-dom';

type BreedNames = {
  id: string,
  name: string,
}

export const GalleryFilters: React.FC = () => {
  const [formData, setFormData] = useState({
    order: '', 
    breed: '', 
    type: '',
    perPage: '',
  });
  const [breedNames, setBreedNames] = useState<BreedNames[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentBreed = searchParams.get('breed') || '';
  const perPage = searchParams.get('perPage') || '5';
  const type = searchParams.get('type') || 'all';
  const order = searchParams.get('order') || 'RAND';

  const handleGetAllBreeds = useCallback(async () => {
    try {
      const res = await request<BreedNames[]>('breeds');

      setBreedNames(res);
    } catch {
      console.log('Error');
    }
  }, []);

  const handleSelectChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }))
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const entries = Object.entries(formData);

    entries.forEach(([query, value]) => {
      if (value === '') {
        searchParams.delete(query);
      } else {
        searchParams.set(query, value);
        searchParams.set('page', '1');
      }
    })

    const newSearchParams = searchParams.toString();

    setSearchParams(newSearchParams);
  }, [formData, searchParams, setSearchParams]);

  useEffect(() => {
    handleGetAllBreeds();
  }, [handleGetAllBreeds]);

  useEffect(() => {
    setFormData(formData => ({
      ...formData,
      order: order, 
      breed: currentBreed, 
      type: type,
      perPage: perPage,
    }))
  }, [currentBreed, order, perPage, searchParams, type])

  return (
    <form className="form-filter" onSubmit={handleSubmit}>
      <div className="form-filter__left">
        <div className="form-filter__item">
          <label 
            htmlFor="orderSelect" 
            className="form-filter__label"
          >
            Order
          </label>
  
          <select
            id="orderSelect"
            name="order"
            className="form-filter__select"
            value={formData.order}
            onChange={handleSelectChange}
          >
            <option value="RAND">Random</option>
            <option value="DESC">Desc</option>
            <option value="ASC">Asc</option>
          </select>
        </div>

        <div className="form-filter__item">
          <label 
            htmlFor="breedSelect"
            className="form-filter__label"
          >
            Breed
          </label>

          <select
            id="breedSelect"
            name="breed"
            className="form-filter__select"
            value={formData.breed}
            onChange={handleSelectChange}
          >
            <option value="">None</option>
            {breedNames.map(el => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-filter__right">
        <div className="form-filter__item">
          <label 
            htmlFor="typeSelect"
            className="form-filter__label"
          >
            Type
          </label>

          <select
            id="typeSelect"
            name="type"
            className="form-filter__select"
            value={formData.type}
            onChange={handleSelectChange}
          >
            <option value="">All</option>
            <option value="jpg, png">Static</option>
            <option value="gif">Animated</option>
          </select>
        </div>

        <div className="form-filter__item">
          <label
            htmlFor="limitSelect"
            className="form-filter__label"
          >
            Limit
          </label>
        
          <div className="form-filter__bottom">
            <select
              id="limitSelect"
              name="perPage"
              className="form-filter__select"
              value={formData.perPage}
              onChange={handleSelectChange}
            >
              <option value="5">Limit: 5</option>
              <option value="10">Limit: 10</option>
              <option value="15">Limit: 15</option>
              <option value="20">Limit: 20</option>
            </select>
            
            <button type="submit" className="form-filter__btn">
              <Update />
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}