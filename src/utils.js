import { validate } from 'superstruct';
import Result from 'crocks/Result/index.js';
import curry from 'crocks/helpers/curry.js';

const { Ok, Err } = Result;

// Object -> Array string
const mapStructError = ({ failures }) =>
  [...failures()].map(
    ({ path, value, type }) =>
      `"${path}" with ${value} is invalid, expected type is: ${type}`,
  );

// Struct -> Object -> Result
const validateDomain = (struct) => (domainData) => {
  const [error, value] = validate(domainData, struct);
  return error
    ? Err({
        message: 'ValidationError',
        details: mapStructError(error),
      })
    : Ok(value);
};

// Error -> String
const getRepoErr = (error) =>
  error.message.match(/duplicate key/)
    ? `duplicated key ${Object.keys(error.keyValue)}`
    : 'failed to create';

const send = curry((res, status, data) => res.status(status).json(data));

const sendError = curry((res, error) => res.status(400).json({ error }));

const executeErrorHandler = curry((res, error) =>
  sendError(res, getRepoErr(error)),
);

const resolveResult = curry((res, status, result) =>
  result.bimap(sendError(res), send(res, status)),
);

export { validateDomain, executeErrorHandler, resolveResult, send };
