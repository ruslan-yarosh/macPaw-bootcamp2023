import { LogType } from "../types/LogType";

type Action = 'add' | 'remove';
type Page = 'Likes' | 'Dislikes' | 'Favourites';

export const handleAddLog = (
  page: Page,
  userLog: LogType[],
  imgId: string,
  setLog: (data: LogType[]) => void,
  action: Action = 'add',
) => {
  const date = new Date;
  const time = date.toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit'
  });

  setLog([
    {
      time,
      imgId,
      page,
      action,
    },
    ...userLog,
  ]);
}