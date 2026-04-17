const capitalize = (value: string) =>
  value.length ? value.charAt(0).toUpperCase() + value.slice(1) : value;

export const formatDay = (date: Date) =>
  new Intl.DateTimeFormat('tr-TR', { day: '2-digit' }).format(date);

export const formatMonth = (date: Date) =>
  capitalize(new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(date));

export const formatDateLong = (date: Date) =>
  capitalize(
    new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date),
  );

export const formatDateShort = (date: Date) =>
  new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
