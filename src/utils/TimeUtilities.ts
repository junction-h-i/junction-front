export enum TIME_TEXT {
  HOUR = 'hr',
  MINUTE = 'min',
};

export const timeToText = (time: number) => {
  if (time < 60) {
    return `${(time % 60).toFixed()}${TIME_TEXT.MINUTE}`;
  }
  return `${(time / 60).toFixed()}${TIME_TEXT.HOUR}` + (time % 60 !== 0 ? ` ${(time % 60).toFixed()}${TIME_TEXT.MINUTE}` : '');
}