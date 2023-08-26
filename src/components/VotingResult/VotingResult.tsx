import React, { useCallback, useEffect, useState } from 'react';
import { Topbar } from '../TopBar';
import { CurrentPage } from '../CurrentPage';
import { request } from '../../api/fetch';
import { VotingType } from '../../types/VotingType';
import { Loader } from '../Loader';
import { NoItemsMessage } from '../NoItemsMessage';
import {ReactComponent as CloseIcon} from '../../assets/icons/close-white.svg';
import { grid } from '../../helpers/grid';
import { handleAddLog } from '../../helpers/handleAddLog';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import { LogType } from '../../types/LogType';
import { UserLog } from '../UserLog';

type Props = {
  pageName: 'Likes' | 'Dislikes',
}

export const VotingResult: React.FC<Props> = ({ pageName }) => {
  const [votes, setVotes] = useState<VotingType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLog, setUserLog] = useLocalStorage<LogType[]>('userLog', []);
  const className = pageName.toLowerCase();

  const handleGetVotes = useCallback(async () => {
    try {
      const res = await request<VotingType[]>('votes?sud_id=test&order=DESC');

      const filteredRes = res.filter(el => {
        const value = pageName === 'Likes' ? 1 : 0;

        return el.sub_id === 'test' && el.value === value
      });

      setVotes(filteredRes);
    } catch {
      console.log('Error');
    } finally {
      setIsLoading(false);
    }
  }, [pageName]);

  const handleDeleteVote = useCallback(async (item: VotingType) => {
    const { id, image_id } = item;

    try {
      await request(`votes/${id}`, 'DELETE');

      setVotes(state => state.filter(el => el.id !== id))
    } catch {
      console.log('Error');
    }

    handleAddLog(pageName, userLog, image_id, setUserLog, 'remove');
  }, [pageName, userLog, setUserLog]);

  useEffect(() => {
    handleGetVotes();
  }, [handleGetVotes]);

  console.log(votes);

  return (
    <section className={`page__section ${className}`}>
      <div className={`${className}__wrapper`}>
        <Topbar />

        <div className="content">
          <div className="content__top">
            <CurrentPage pageName={pageName} />
          </div>

          {!isLoading && !votes.length && (
            <NoItemsMessage />
          )}

          {isLoading && !votes.length ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid--margin">
                {votes.map((el, i )=> (
                  <div
                    className={`grid__item grid__item--${i + 1}`}
                    key={el.id}
                    style={grid(i)}
                  >
                    <img
                      src={el.image.url}
                      className="grid__img"
                      alt="Cat image"
                    />
                    <div className="grid__wrapper">
                      <button
                        type="button"
                        className="grid__fav-btn"
                        onClick={() => handleDeleteVote(el)}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <UserLog userLog={userLog} actionPage={pageName} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
