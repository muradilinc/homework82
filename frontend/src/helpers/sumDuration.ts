import { Track } from '../type';

export const sumDuration = (track: Track[]) => {
  let sum = 0;

  for (let i = 0; i < track.length; i++) {
    const trackDuration = track[i].duration;
    const [minutes, seconds] = trackDuration.split(':');

    sum += parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  }

  const totalMinutes = Math.floor(sum / 60);
  const totalSeconds = sum % 60;

  const formattedMinutes =
    totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes;
  const formattedSeconds =
    totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds;

  return `${formattedMinutes} min. ${formattedSeconds} sec.`;
};
