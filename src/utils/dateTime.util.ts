type MonthLength = 'long' | 'short' | 'numeric' | '2-digit' | 'narrow' | undefined;

export const convertDate = (datetime: Date | string, length: MonthLength = 'short') => {
  // if(!datetime) return;
  const dateObj = new Date(datetime);
  const day = dateObj.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: length }).format(dateObj);
  const year = dateObj.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  const time = dateObj.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
  return { date: formattedDate, time };
};

export const epochTime = (datetime: Date) => {
  const dateObj = new Date(datetime);
  const today = new Date().getTime();
  const epoch = dateObj.getTime();
  const countdown = epoch - today;

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const millisecondsPerHour = 60 * 60 * 1000;
  const millisecondsPerMinute = 60 * 1000;

  let days = Math.floor(countdown / millisecondsPerDay);
  let hours = Math.floor((countdown % millisecondsPerDay) / millisecondsPerHour);
  let minutes = Math.floor((countdown % millisecondsPerHour) / millisecondsPerMinute);
  // let seconds = Math.floor((countdown % millisecondsPerMinute) / 1000);

  days = Math.max(0, days);
  hours = Math.max(0, hours);
  minutes = Math.max(0, minutes);
  // seconds = Math.max(0, seconds);

  return { days, hours, minutes};
};
