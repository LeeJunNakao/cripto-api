import axios from 'axios';
import Async from 'crocks/Async/index.js';
import Result from 'crocks/Result/index.js';

import CurrencyRepo from './repo.js';
import { toDomainCurrency } from './domain.js';

const { fromPromise } = Async;
const { Err } = Result;

const getCurrentPrice = (data, sendResponse) => {
  const getError = () => ({ message: 'failed to get price currency' });
  const sendError = () => sendResponse(getError());

  data.bimap(sendError, (currency) => {
    const name = currency.name;
    const url = `https://api.coingecko.com/api/v3/coins/${name}`;
    const getPrice = () => axios.get(url);
    const sendCurrency = (response) =>
      sendResponse({
        ...currency,
        price: response.data.market_data.current_price.brl,
      });

    const setPrice = fromPromise(getPrice);
    setPrice().fork(sendError, sendCurrency);
    return currency;
  });
};

const createCurrency = (data) => {
  const getError = () => ({ message: 'failed to add currency' });
  const sendError = () => sendResponse(getError());
  const getPrice = (currency) => getCurrentPrice(currency, sendResponse);

  return CurrencyRepo.add(data).map(toDomainCurrency);
};

const getCurrency = ({ name }) => {
  const getData = (data) =>
    data
      ? { result: toDomainCurrency(data) }
      : { error: Err({ message: 'currency not found' }) };
  const getResult = (response) => response.bimap(sendResponse, sendResponse);
  const getPrice = (currency) => getCurrentPrice(currency, sendResponse);

  return CurrencyRepo.findByName(name).map(getData);

  // return Async((reject, resolve) => resolve({ result: { name } }));
};

const updateCurrency = ({ name, quantity }, sendResponse) => {
  const getError = () => ({ message: 'failed to update currency' });
  const sendError = () => sendResponse(getError());
  const getUpdatedData = () => getCurrency({ name }, sendResponse);

  CurrencyRepo.update({ name }, { quantity });
};
export { createCurrency, getCurrency, updateCurrency };
