export const formateDate = (date = Date.now()) => {
  return new Date(date).toLocaleDateString('ru-Ru', {
    month: 'narrow',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
