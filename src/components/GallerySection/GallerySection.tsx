import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CurrentPage } from '../CurrentPage';
import { Topbar } from '../TopBar';
import './GallerySection.scss';

import {ReactComponent as FavIconWhite} from '../../assets/icons/fav-full-white.svg';
import {ReactComponent as UploadIcon} from '../../assets/icons/upload.svg';

import { request } from '../../api/fetch';
import { Loader } from '../Loader';
import { NoItemsMessage } from '../NoItemsMessage';
import { grid } from '../../helpers/grid';
import { useSearchParams } from 'react-router-dom';
import { PageControlBtns } from '../PageControlBtns';
import { GalleryFilters } from '../GalleryFilters';
import classNames from 'classnames';
import { RequestMethod } from '../../types/RequestMethod';
import { UploadModal } from '../UploadModal';

type BreedImgType = {
  breeds: [{
    name: string,
    id: string,
  }],
  id: string,
  url: string,
}

type Props = {
  favouritesId: string[],
  setFavouritesId: React.Dispatch<React.SetStateAction<string[]>>,
}

export const GallerySection: React.FC<Props> = ({ favouritesId, setFavouritesId }) => {
  const [galleryImg, setGalleryImg] = useState<BreedImgType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);

  const currentBreed = searchParams.get('breed') || '';
  const perPage = searchParams.get('perPage') || '5';
  const order = searchParams.get('order') || 'DESC';
  const page = searchParams.get('page') || '1';
  const type = searchParams.get('type') || 'all';

  const handleGetGalleryImg = useCallback(async () => {
    setIsLoading(true);

    const breedParam = `breed_ids=${currentBreed}`;
    const perPageParam = `limit=${perPage}`;
    const orderParam = `order=${order}`;
    const pageParam = `page=${+page - 1}`;
    const typeParam = `mime_types=${type}`;

    try {
      const res = await request<BreedImgType[]>(
        `images/search?${orderParam}&${breedParam}&${perPageParam}&${pageParam}&${typeParam}`
      );

      setGalleryImg(res);
    } catch {
      console.log('Error');
    } finally {
      setIsLoading(false);
    }
  }, [currentBreed, perPage, order, page, type]);

  const handleAddAction = useCallback(async (
    url: string, 
    id: string, 
    method: RequestMethod
  ) => {
    try {
      await request(url, method, {
        image_id: id,
        sub_id: 'test',
      });
    } catch {
      console.log('Error');
    }
  }, []);

  const handleFavClick = useCallback((id: string) => {
    if (favouritesId.includes(id)) {
      handleAddAction(`favourites/${id}`, id, 'DELETE');

      setFavouritesId(state => state.filter(el => el !== id));
    } else {
      handleAddAction('favourites', id, 'POST');
      setFavouritesId(state => [
        ...state,
        id,
      ]);
    }

  }, [favouritesId, handleAddAction, setFavouritesId]);

  useEffect(() => {
    handleGetGalleryImg();
  }, [handleGetGalleryImg]);
  
  return (
    <section className="page__section gallery">
      <div className="gallery__wrapper">
        <Topbar />

        <div className="content">
          <div className="content__top content__top--gallery">
            <CurrentPage pageName='Gallery' />
            
            <button className="gallery__upload" onClick={() => setShowModal(true)}>
              <UploadIcon />
              Upload
            </button>
          </div>

          <GalleryFilters />


          {!isLoading && !galleryImg.length && (
            <NoItemsMessage />
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid--margin">
                {galleryImg.map((img, i )=> (
                  <div
                    className={`grid__item grid__item--${i + 1}`}
                    key={img.id}
                    style={grid(i)}
                  >
                    <img
                      src={img.url}
                      className="grid__img"
                      alt="Cat image"
                    />
                    <div className="grid__wrapper">
                      <button
                          type="button"
                          className={classNames('grid__btn', {
                            'grid__btn--active': favouritesId.includes(img.id),
                          })}
                          onClick={() => handleFavClick(img.id)}
                        >
                          <FavIconWhite />
                        </button>
                    </div>
                  </div>
                ))}
              </div>

              <PageControlBtns length={galleryImg.length} />
            </>
          )}

        </div>
        {showModal && createPortal(
          <UploadModal setShowModal={setShowModal} />,
          document.body
        )}
      </div>
    </section>
  );
}
