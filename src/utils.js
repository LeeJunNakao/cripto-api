import { validate } from 'superstruct';
import Result from 'crocks/Result/index.js';

const { Ok, Err } = Result;
const mapStructError = ({ failures }) =>
  [...failures()].map(
    ({ path, value, type }) =>
      `"${path}" with ${value} is invalid, expected type is: ${type}`
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

export { validateDomain };
