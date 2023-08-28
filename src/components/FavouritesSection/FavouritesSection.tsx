import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CurrentPage } from '../CurrentPage';
import { Topbar } from '../TopBar';
import {ReactComponent as FavIconWhite} from '../../assets/icons/fav-full-white.svg';
import { request } from '../../api/fetch';
import { Loader } from '../Loader';
import { UserLog } from '../UserLog';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import { LogType } from '../../types/LogType';
import { FavouriteType } from '../../types/FavouriteType';
import { handleAddLog } from '../../helpers/handleAddLog';
import { NoItemsMessage } from '../NoItemsMessage';
import { grid } from '../../helpers/grid';
import classNames from 'classnames';

type Props = {
  setFavouritesId: React.Dispatch<React.SetStateAction<string[]>>,
}

export const FavouritesSection: React.FC<Props> = ({ setFavouritesId }) => {
  const [favourites, setFavourites] = useState<FavouriteType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLog, setUserLog] = useLocalStorage<LogType[]>('userLog', []);

  const favIds = useMemo(() => (
    favourites.map(el => el.image.id)
  ), [favourites])

  const handleGetFav = useCallback(async () => {
    try {
      const res = await request<FavouriteType[]>('favourites?sud_id=test&order=DESC');

      setFavourites(res);
    } catch {
      console.log('Error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteFav = useCallback(async (item: FavouriteType) => {
    const { id, image_id } = item;

    try {
      await request(`favourites/${id}`, 'DELETE');

      setFavourites(state => state.filter(el => el.id !== id))
    } catch {
      console.log('Error');
    }

    setFavouritesId(state => state.filter(el => el !== image_id));
    handleAddLog('Favourites', userLog, image_id, setUserLog, 'remove');
  }, [setFavouritesId, userLog, setUserLog]);

  useEffect(() => {
    handleGetFav();

  }, [handleGetFav]);

  useEffect(() => {
    setFavouritesId(state => [
      ...state,
      ...favIds,
    ])
  }, [favIds, setFavouritesId])
  
  return (
    <section className="page__section favourites">
      <div className="favourites__wrapper">
        <Topbar />

        <div className="content">
          <div className="content__top">
            <CurrentPage pageName='Favourites' />
          </div>

          {!isLoading && !favourites.length && (
            <NoItemsMessage />
          )}

          {isLoading && !favourites.length ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid--margin">
                {favourites.map((fav, i )=> (
                  <div
                    className={`grid__item grid__item--${i + 1}`}
                    key={fav.id}
                    style={grid(i)}
                  >
                    <img
                      src={fav.image.url}
                      className="grid__img"
                      alt="Cat image"
                    />

                    <div className="grid__wrapper">
                      <button
                        type="button"
                        className={classNames('grid__btn', {
                          'grid__btn--active': favIds.includes(fav.image.id),
                        })}
                        onClick={() => handleDeleteFav(fav)}
                      >
                        <FavIconWhite />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <UserLog userLog={userLog} actionPage={'Favourites'} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}