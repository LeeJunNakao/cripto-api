import { validate } from 'superstruct';
import Result from 'crocks/Result/index.js';

const { Ok, Err } = Result;
const mapStructError = ({ failures }) =>
  [...failures()].map(
    ({ path, value, type }) =>
      `"${path}" with ${value} is invalid, expected type is: ${type}`,
  );

const validateDomain = (struct) => (domainData) => {
  const [error, value] = validate(domainData, struct);
  return error
    ? Err({
        message: 'ValidationError',
        details: mapStructError(error),
      })
    : Ok(value);
};

const pipeAsync = (value, errCallback, ...functions) => {
  const exec = (v, ...fns) => {
    const [fn, ...rfns] = fns;
    if (fn) {
      fn(v).fork(
        (data) => {
          pipeAsync(data, errCallback, ...rfns);
        },
        (data) => {
          pipeAsync(data, errCallback, ...rfns);
        },
      );
    }
  };

  value.bimap(errCallback, (i) => {
    if (functions.length > 0) exec(i, ...functions);
    return (...f) => exec(i, ...f);
  });
};

const getRepoErr = (resolve) => (error) => {
  const message = error.message.match(/duplicate key/)
    ? `duplicated key ${Object.keys(error.keyValue)}`
    : 'failed to create';
  resolve(Err({ message }));
};

export { validateDomain, pipeAsync, getRepoErr };
