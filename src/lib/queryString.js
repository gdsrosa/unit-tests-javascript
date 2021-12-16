const formatObjectToQueryString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your params');
  }
  return `${key}=${value}`;
};

module.exports.queryString = obj => {
  return Object.entries(obj).map(formatObjectToQueryString).join('&');
};

module.exports.parse = queryString => {
  const result = queryString.split('&').map(item => {
    let [key, value] = item.split('=');

    if (value.indexOf(',') > -1) {
      value = value.split(',');
    }

    return [key, value];
  });

  return Object.fromEntries(result);
};
