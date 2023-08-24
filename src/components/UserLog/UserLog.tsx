import React from 'react';

import './UserLog.scss';
import {ReactComponent as LikeIcon} from '../../assets/icons/like.svg';
import {ReactComponent as FavIcon} from '../../assets/icons/fav.svg';
import {ReactComponent as DislikeIcon} from '../../assets/icons/dislike.svg'
import { LogType } from '../../types/LogType';

type Props = {
  userLog: LogType[],
}

export const UserLog: React.FC<Props> = ({ userLog }) => {

  return (
    userLog.map(log => (
      <div className="user-log" key={log.imgId}>
        <div className="user-log__text">
          <span className="user-log__time">{log.time}</span>

          <p className="user-log__action">
            Image ID:&nbsp;
            <span className="user-log__bold">{log.imgId}</span>
            &nbsp;was added to {log.action}
          </p>
        </div>

        {log.action === 'Likes' && (
          <LikeIcon className="user-log__like" />
        )}

        {log.action === 'Favourites' && (
          <FavIcon />
        )}

        {log.action === 'Dislikes' && (
          <DislikeIcon className="user-log__dislike" />
        )}
      </div>
    ))
  )
}