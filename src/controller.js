import { Router } from 'express';
import curry from 'crocks/helpers/curry.js';
import { executeErrorHandler, resolveResult, send } from './utils.js';

const createRoute = curry((createCurrency, req, res) =>
  createCurrency(req.body).fork(
    executeErrorHandler(res),
    resolveResult(res, 201),
  ),
);

const getRoute = curry((getCurrency, req, res) =>
  getCurrency(req.query).fork(
    executeErrorHandler(res),
    resolveResult(res, 200),
  ),
);

const updateRoute = curry((updateCurrency, req, res) =>
  updateCurrency(req.body).fork(
    executeErrorHandler(res),
    resolveResult(res, 200),
  ),
);

export default ({ createCurrency, getCurrency, updateCurrency }) =>
  Router()
    .get('/', getRoute(getCurrency))
    .post('/', createRoute(createCurrency))
    .put('/', updateRoute(updateCurrency));
