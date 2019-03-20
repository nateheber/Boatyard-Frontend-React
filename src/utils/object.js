import * as _ from 'lodash';

export const keyToSnakeCase = (obj) => {
  const newObj = {};
  _.keys(obj).forEach((key) => {
    const snakeCaseKey = _.snakeCase(key);
    _.set(newObj, snakeCaseKey, _.get(obj, key));
  });
  return newObj;
}