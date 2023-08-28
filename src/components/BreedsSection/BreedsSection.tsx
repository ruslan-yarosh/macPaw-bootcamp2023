import React, { useCallback, useEffect, useState } from 'react';
import { request } from '../../api/fetch';
import { CurrentPage } from '../CurrentPage';
import { Topbar } from '../TopBar';

import { Loader } from '../Loader';
import { grid } from '../../helpers/grid';
import { Link, useSearchParams } from 'react-router-dom';
import { BreedsFilter } from '../BreedsFilter';
import { PageControlBtns } from '../PageControlBtns';

type BreedImgType = {
  breeds: [{
    name: string,
    id: string,
  }],
  id: string,
  url: string,
}

export const BreedsSection: React.FC = () => {
  const [breedsImg, setBreedsImg] = useState<BreedImgType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const currentBreed = searchParams.get('breed') || '';
  const perPage = searchParams.get('perPage') || '5';
  const order = searchParams.get('order') || 'ASC';
  const page = searchParams.get('page') || '1';

  const handleGetBreedImg = useCallback(async () => {
    setIsLoading(true);

    const breedParam = currentBreed 
      ? `breed_ids=${currentBreed}` 
      : 'has_breeds=1';
    const perPageParam = `limit=${perPage}`;
    const orderParam = `order=${order}`;
    const pageParam = `page=${+page - 1}`

    try {
      const res = await request<BreedImgType[]>(
        `images/search?${orderParam}&${breedParam}&${perPageParam}&${pageParam}`
      );

      setBreedsImg(res);
    } catch {
      console.log('Error');
    } finally {
      setIsLoading(false);
    }
  }, [currentBreed, perPage, order, page]);


  useEffect(() => {
    handleGetBreedImg();
  }, [handleGetBreedImg]);

  return (
    <section className="page__section breeds">
      <div className="breeds__wrapper">
        <Topbar />

        <div className="content">
          <div className="content__top">
            <CurrentPage pageName='Breeds' />
            <BreedsFilter />
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid--margin">
                {breedsImg.map((breed, i )=> (
                  <div
                    className={`grid__item grid__item--${i + 1}`}
                    key={breed.id}
                    style={grid(i)}
                  >
                    <img
                      src={breed.url}
                      className="grid__img"
                      alt="Cat image"
                    />
                    <div className="grid__wrapper">
                      <Link 
                        to={`/breeds/${breed.breeds[0].id}`} 
                        className="grid__link"
                      >
                        {breed.breeds[0].name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <PageControlBtns length={breedsImg.length} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
