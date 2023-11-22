export const getLocaleDateFromUnixTime = (unixTimeInSeconds) => {
  const date = new Date(unixTimeInSeconds * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
