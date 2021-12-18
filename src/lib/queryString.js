const formatObjectToQueryString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your params');
  }
  return `${key}=${value}`;
};

export function queryString(obj) {
  return Object.entries(obj).map(formatObjectToQueryString).join('&');
}

export function parse(queryString) {
  const result = queryString.split('&').map(item => {
    let [key, value] = item.split('=');

    if (value.indexOf(',') > -1) {
      value = value.split(',');
    }

    return [key, value];
  });

  return Object.fromEntries(result);
}
