export const httpToHttps = (url: string): string => {
  return url.replace("http", "https");
};

export const secondsToTime = (s: number): string => {
  const hours = Math.floor(s / (60 * 60));
  s = s % (60 * 60);
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;

  return `${minutes}`.padStart(2, "0") + ":" + `${seconds}`.padStart(2, "0");
};
