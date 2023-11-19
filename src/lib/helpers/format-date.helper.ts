import dayjs from 'dayjs';
export const formatDate = (date?: Date) => {
  return date ? dayjs(new Date(date)).format('DD.MM.YYYY') : '';
};
