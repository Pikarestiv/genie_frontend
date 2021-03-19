import CONFIG from '../config';

const getApiLink = (path) => {
  // return `${CONFIG.API_LINK}${path}`
  return `http://localhost:3010/${path}`
};

const replaceAll = (target, search, replacement) => {
  return target.replace(new RegExp(search, 'g'), replacement);
};

const snakeCaseToText = (text) => {
  return text.replace(/_/g, ' ').replace(/\w\S*/g, function(word){
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
}

const tagToText = (tag) => {
  return replaceAll(tag, '-', ' ');
}

const tokenize = (s = "") =>{
  return s
    .replace(/[^a-zA-Z+ ]/g, "")
    .replace(/\+(and|the|of|on|in|out|a|an)\+/g, "+")
    .trim()
    .split('+')

    .filter(elm => elm)
}

export {
  getApiLink,
  snakeCaseToText,
  tokenize,
  tagToText
};