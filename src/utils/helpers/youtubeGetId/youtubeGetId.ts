// todo  write tests
export const youtubeGetId = (url: string) => {
  const regexResult = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return regexResult[2] !== undefined
    ? // eslint-disable-next-line no-useless-escape
      regexResult[2].split(/[^0-9a-z_\-]/i)[0]
    : regexResult[0];
};
