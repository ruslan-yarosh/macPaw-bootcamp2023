import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/pagination';
import '../../styles/blocks/swiper.scss';


import { Topbar } from "../TopBar";
import { CurrentPage } from "../CurrentPage";
import { Loader } from "../Loader";
import { request } from "../../api/fetch";
import './BreedInfo.scss';

type BreedInfo = {
  id: string,
  name: string,
  description: string,
  temperament: string,
  origin: string,
  weight: {
    metric: string,
  },
  life_span: string,
}

type BreedImgType = {
  breeds: [{
    name: string,
    id: string,
  }],
  id: string,
  url: string,
}

export const BreedInfo: React.FC = () => {
  const [breedInfo, setBreedInfo] = useState<BreedInfo>({
    id: '',
    name: '',
    description: '',
    temperament: '',
    origin: '',
    weight: {
      metric: '',
    },
    life_span: '',
  });
  const [breedImg, setBreedImg] = useState<BreedImgType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { breedId } = useParams();
  const smallDesc = breedInfo.description.slice(0, breedInfo.description.indexOf('.'));

  const handleGetBreedInfo = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await request<BreedInfo>(`breeds/${breedId}`);

      setBreedInfo(res);
    } catch {
      console.log('Error');
    } finally {
      setIsLoading(false);
    }
  }, [breedId]);

  const handleGetBreedImg = useCallback(async () => {
    setIsLoading(true);

    const breedParam = `breed_id=${breedId}`; 

    try {
      const res = await request<BreedImgType[]>(
        `images/search?${breedParam}&limit=5`
      );

      setBreedImg(res);
    } catch {
      console.log('Error');
    } finally {
      setIsLoading(false);
    }
  }, [breedId]);

  useEffect(() => {
    Promise.all([handleGetBreedInfo(), handleGetBreedImg()])
  }, [handleGetBreedInfo, handleGetBreedImg])
  
  return (
    <section className="page__section info">
      <div className="info__wrapper">
        <Topbar />

        <div className="content">
          <div className="content__top">
            <CurrentPage pageName='Breeds' breedId={breedId} />
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Swiper 
                pagination={{
                  el: '.swiper-pagination',
                  clickable: true,
                }} 
                modules={[Pagination]} 
                className="mySwiper"
              >
                {breedImg.map(el => (
                  <SwiperSlide key={el.id}>
                    <img 
                      src={el.url} 
                      className="info__img"
                      alt="Cat image" 
                    />
                  </SwiperSlide>
                ))}

                <div className="swiper-pagination">
                  fsf
                </div>
              </Swiper>

              <div className="info__breed">
                <h3 className="info__title">
                  {breedInfo.name}
                </h3>

                <p className="info__description">
                  {smallDesc}
                </p>

                <div className="info__details">
                  <div className="info__left">
                    <span className="info__char">
                      Temperament:
                    </span>
                    <p className="info__detail">

                      {` ${breedInfo.temperament}`}
                    </p>
                  </div>

                  <div className="info__right">
                    <p className="info__detail">
                      <span className="info__char">
                        Origin:
                      </span>

                      {` ${breedInfo.origin}`}
                    </p>

                    <p className="info__detail">
                      <span className="info__char">
                        Weight:
                      </span>

                      {` ${breedInfo.weight.metric} kgs`}
                    </p>

                    <p className="info__detail">
                      <span className="info__char">
                        Life span:
                      </span>
                      {` ${breedInfo.life_span}`}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
