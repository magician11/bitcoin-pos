// derived from https://stackoverflow.com/a/2880929/2813041
export const getURLparams = () => {
  const pl = /\+/g;
  const search = /([^&=]+)=?([^&]*)/g;
  const decode = s => decodeURIComponent(s.replace(pl, ' '));
  const query = window.location.search.substring(1);

  const urlParams = {};
  let match;
  while ((match = search.exec(query))) {
    urlParams[decode(match[1])] = decode(match[2]);
  }

  return urlParams;
};
