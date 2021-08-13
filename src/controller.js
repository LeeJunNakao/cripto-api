import { Router } from 'express';
import curry from 'crocks/helpers/curry.js';

const resolveAndSend = curry((res, status, data) =>
  res.status(status).json(data),
);

const executeErrorHandler = (error, res) =>
  res.status(400).json({ msg: 'error' });

const createRoute = curry((createCurrency, req, res) => {
  createCurrency(req.body).fork(
    ({ error }) => executeErrorHandler(error, res),
    (result) => {
      console.log('result', result);
    },
  );
});
const getRoute = curry((getCurrency, req, res) =>
  getCurrency(req.query).fork(
    ({ error }) => executeErrorHandler(error, res),
    ({ result }) => {
      console.log(result);
      resolveAndSend(res, 200, result);
    },
  ),
);

const updateRoute = curry((updateCurrency, req, res) =>
  getCurrency(req.query).fork(
    ({ error }) => executeErrorHandler(error, res),
    ({ result }) => resolveAndSend(res, 201, result),
  ),
);

export default ({ createCurrency, getCurrency, updateCurrency }) =>
  Router()
    .get('/', getRoute(getCurrency))
    .post('/', createRoute(createCurrency))
    .put('/', updateRoute(updateCurrency));
