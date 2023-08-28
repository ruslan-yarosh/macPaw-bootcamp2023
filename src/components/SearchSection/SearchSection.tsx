import React, { useCallback, useEffect, useState } from "react"
import { Topbar } from "../TopBar"
import { CurrentPage } from "../CurrentPage"
import { Loader } from "../Loader";
import { request } from "../../api/fetch";
import { Link, useSearchParams } from "react-router-dom";
import { grid } from "../../helpers/grid";
import './SearchSection.scss';
import { NoItemsMessage } from "../NoItemsMessage";

type BreedImgType = {
  breeds: [{
    name: string,
    id: string,
  }],
  id: string,
  url: string,
}

type BreedNames = {
  id: string,
  name: string,
}

export const SearchSection: React.FC = () => {
  const [searchResult, setSearcResult] = useState<BreedImgType[]>([]);
  const [breeds, setBreeds] = useState<BreedNames[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  const handleGetAllBreeds = useCallback(async () => {
    try {
      const res = await request<BreedNames[]>('breeds');

      const filteredRes = res.filter(el => (
        el.name.toLowerCase().includes(queryParam.toLowerCase())
      ))

      setBreeds(filteredRes);
    } catch {
      console.log('Error');
    }
  }, [queryParam]);


  const handleGetBreedImg = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await request<BreedImgType[]>(
        `images/search?breed_ids=${breeds[0].id}&limit=20`
      );

      setSearcResult(res);
    } catch {
      console.log('Error');
    } finally {
      setIsLoading(false);
    }
  }, [breeds]);


  useEffect(() => {
    handleGetAllBreeds();
  }, [handleGetAllBreeds]);


  useEffect(() => {
    handleGetBreedImg();
  }, [handleGetBreedImg]);

  console.log(searchResult);
  

  return (
    <section className="page__section search">
      <div className="search__wrapper">
        <Topbar />

        <div className="content">
          <div className="content__top">
            <CurrentPage pageName='Search' />
          </div>

          <p className="search__info">
            {`Search results for: `}
            <span className="search__param">{queryParam}</span>
          </p>


          {!isLoading && !searchResult.length && (
            <NoItemsMessage />
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid--margin">
                {searchResult.map((breed, i )=> (
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
            </>
          )}
        </div>
      </div>
    </section>
  )
}