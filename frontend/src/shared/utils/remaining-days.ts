export const getDaysRemaining = (targetDate: Date): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timeDiff = targetDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff < 0) {
    return 'Просрочено';
  } else if (daysDiff === 0) {
    return 'Сегодня';
  } else {
    return `${daysDiff} дн.`;
  }
};
