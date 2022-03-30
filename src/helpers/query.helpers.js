const getFilterSort = (sortItems) => {
  const arraySortItems = sortItems.split(','),
    objSort = {};

  arraySortItems.forEach((item) => {
    const isDesc = item.includes('-');
    if (!isDesc) {
      objSort[item] = 1;
    } else {
      objSort[replaceCharacter(item, '-', '')] = -1;
    }
  });

  return objSort;
};

const replaceCharacter = (string, characterFind, characterReplace) => {
  return string.replace(characterFind, characterReplace);
};

const getFilterSearch = (search) => {
  for (const key in search) {
    const filter = search[key];
    const occurrences = [...filter].reduce((a, c) => (c === '*' ? ++a : a), 0); //eslint-disable-line no-param-reassign
    optionFactory(occurrences, search, key);
  }
};

const optionFactory = (occurrences, filter, key) => {
  switch (occurrences) {
    case 1:
      return createRegWilcardsByOne(filter, key);
    case 2:
      return createRegWilcardsByTwo(filter, key);
    default:
      return createRegWilcardsByDefault(filter, key);
  }
};

const createRegWilcardsByOne = (filter, key) => {
  const canStartWithWilcard = filter[key].startsWith('*');
  const valueRepalce = replaceCharacter(filter[key], '*', '');
  if (!canStartWithWilcard) {
    filter[key] = new RegExp(`^${valueRepalce}`, 'i');
  } else {
    filter[key] = new RegExp(`${valueRepalce}$`, 'i');
  }
};

const createRegWilcardsByTwo = (filter, key) => {
  const valueRepalce = replaceCharacter(filter[key], '*', '');
  filter[key] = new RegExp(`^.*${valueRepalce}.*$`, 'i');
};

const createRegWilcardsByDefault = (filter, key) => {
  const valueRepalce = replaceCharacter(filter[key], '*', '');
  filter[key] = new RegExp(`^${valueRepalce}$`, 'i');
};

export { getFilterSort, replaceCharacter, getFilterSearch };
