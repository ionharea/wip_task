
const regExp = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

export const transformFileNameIntoPathLikeFileName = (fileName: string) => fileName.match(regExp)?.map(subStr => subStr.toLowerCase()).join('-');
