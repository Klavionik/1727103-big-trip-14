import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(duration);
dayjs.extend(isSameOrAfter);

const HOUR_IN_MS = 3600000;
const DAY_IN_MS = HOUR_IN_MS * 24;

const formatDuration = (duration) => {
  const durationObj = dayjs.duration(duration);

  if (duration < HOUR_IN_MS) {
    return durationObj.format('mm[M]');
  }

  if (duration >= HOUR_IN_MS && duration < DAY_IN_MS) {
    return durationObj.format('HH[H] mm[M]');
  }

  if (duration >= DAY_IN_MS) {
    return durationObj.format('DD[D] HH[H] mm[M]');
  }
};

const getDiff = (start, end) => {
  if (!(start instanceof dayjs)) {
    start = dayjs(start);
  }

  if (!(end instanceof dayjs)) {
    end = dayjs(end);
  }

  return end.diff(start);
};

const getDuration = (start, end) => {
  const diff = getDiff(start, end);
  return dayjs.duration(diff).asMilliseconds();
};

const formatTime = (date) => dayjs(date).format('HH:mm');

const formatDate = (date) => dayjs(date).format('MMM D');

const formatInputDate = (date) => date ? dayjs(date).format('DD/MM/YY HH:mm') : '';

const now = () => dayjs();

const processEventDate = (start, end) => {
  start = dayjs(start);
  end = dayjs(end);

  const startTime = formatTime(start);
  const endTime = formatTime(end);
  const startDate = formatDate(start);

  const duration = formatDuration(getDuration(start, end));

  return {
    startDate,
    startTime,
    endTime,
    duration,
  };
};

const isPast = (event) => {
  return dayjs(event.end).isBefore(now()) || dayjs(event.start).isBefore(now());
};

const isFuture = (event)  => {
  return dayjs(event.start).isSameOrAfter(now()) || dayjs(event.end).isAfter(now());
};

const makeEmptyDuration = () => dayjs.duration(0);

export {
  processEventDate,
  formatInputDate,
  now,
  isFuture,
  isPast,
  getDuration,
  formatDuration,
  makeEmptyDuration
};
