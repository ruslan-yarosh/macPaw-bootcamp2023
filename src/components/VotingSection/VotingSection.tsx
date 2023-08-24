import React, { useCallback, useEffect, useState } from 'react';

import './VotingSection.scss';
import { Topbar } from '../TopBar';
import {ReactComponent as LikeIcon} from '../../assets/icons/like.svg';
import {ReactComponent as FavIcon} from '../../assets/icons/fav.svg';
import {ReactComponent as DislikeIcon} from '../../assets/icons/dislike.svg'

import { request } from '../../api/fetch';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { UserLog } from '../UserLog';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import { LogType } from '../../types/LogType';
import { CurrentPage } from '../CurrentPage';

type ResponseType = {
  id: string,
  url: string
}

export const VotingSection: React.FC = () => {
  const [randomImg, setRandomImg] = useState<ResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLog, setUserLog] = useLocalStorage<LogType[]>('userLog', []);

  const handleAddAction = useCallback(async (url: string, value?: string,) => {
    try {
      await request(url, 'POST', {
        image_id: randomImg?.id,
        sub_id: 'test',
        value,
      })
    } catch {
      console.log('Error');
    }
  }, [randomImg]);

  const handleGetImg = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await request<ResponseType[]>('images/search');

      setRandomImg(res[0]);
    } catch {
      console.log('Error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddLog = (action: string) => {
    const date = new Date;
    const time = date.toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit'
    });

    if (randomImg) {
      setUserLog([
        {
          time: time,
          imgId: randomImg.id,
          action,
        },
        ...userLog,
      ])
    }
  }

  const handleLikeClick = () => {
    handleAddLog('Likes');

    Promise.all([handleAddAction('votes', '1'), handleGetImg()]);
  };

  const handleDislikeClick = () => {
    handleAddLog('Dislikes');

    Promise.all([handleAddAction('votes', '0'), handleGetImg()]);
  }

  const handleFavouriteClick = () => {
    handleAddLog('Favourites');

    Promise.all([handleAddAction('favourites'), handleGetImg()]);
  }

  useEffect(() => {
    handleGetImg();
  }, [handleGetImg]);


  return (
    <section className="page__section voting">
      <div className="voting__wrapper">
        <Topbar />

        <div className="content">
          <div className="content__top">
            <CurrentPage pageName='Voting' />
          </div>

          <div className="voting__img">
            {isLoading ? (
              <Loader />
            ) : (
              <img 
                src={randomImg?.url} 
                className="voting__img1"
                alt="Cat image" 
              />
            )}

            <div className="voting__actions">
              <button 
                type="button" 
                className={
                  classNames('voting__btn', 'voting__btn--like',
                  {
                    'voting__btn--disabled': isLoading,
                  }
                )}
                onClick={handleLikeClick}
              >
                <LikeIcon />
              </button>

              <button 
                type="button" 
                className={
                  classNames('voting__btn', 'voting__btn--fav',
                  {
                    'voting__btn--disabled': isLoading,
                  }
                )}
                onClick={handleFavouriteClick}
              >
                <FavIcon />
              </button>

              <button 
                type="button" 
                className={
                  classNames('voting__btn', 'voting__btn--dis',
                  {
                    'voting__btn--disabled': isLoading,
                  }
                )}
                onClick={handleDislikeClick}
              >
                <DislikeIcon />
              </button>
            </div>
          </div>

          <UserLog userLog={userLog} />
        </div>
      </div>
    </section>
  );
}
