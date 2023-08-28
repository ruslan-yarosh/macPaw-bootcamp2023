import React, { useMemo } from 'react';

import './UserLog.scss';
import {ReactComponent as LikeIcon} from '../../assets/icons/like.svg';
import {ReactComponent as FavIcon} from '../../assets/icons/fav.svg';
import {ReactComponent as DislikeIcon} from '../../assets/icons/dislike.svg'
import { LogType } from '../../types/LogType';
import { useLocation } from 'react-router-dom';

type Props = {
  userLog: LogType[],
  actionPage?: string,
}

export const UserLog: React.FC<Props> = ({ userLog, actionPage = '' }) => {
  const location = useLocation();

  const visibleUserLog = useMemo(() => {
    if (location.pathname !== '/voting') {
      return userLog.filter(log => log.action === 'remove' && actionPage === log.page);
    }

    return userLog;
  }, [location.pathname, userLog, actionPage]);
  
  return (
    <div className="user-log">
      {visibleUserLog.map(log => (
        <div className="user-log__content" key={log.id}>
          <div className="user-log__text">
            <span className="user-log__time">{log.time}</span>

            <p className="user-log__action">
              Image ID:&nbsp;

              <span className="user-log__bold">{log.imgId}</span>
              
              {log.action === 'remove' 
                ? ` was removed from ${log.page}` 
                : ` was added to ${log.page}`} 
            </p>
          </div>

          {log.page === 'Likes' && log.action === 'add' && (
            <LikeIcon className="user-log__like" />
          )}

          {log.page === 'Favourites' && log.action === 'add' && (
            <FavIcon />
          )}

          {log.page === 'Dislikes' && log.action === 'add' && (
            <DislikeIcon className="user-log__dislike" />
          )}
        </div>
      ))}
    </div>
  )
}