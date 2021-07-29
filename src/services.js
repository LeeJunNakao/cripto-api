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

const createCurrency = (data, sendResponse) => {
  const getError = () => ({ message: 'failed to add currency' });
  const sendError = () => sendResponse(getError());
  const getPrice = (currency) => getCurrentPrice(currency, sendResponse);

  return CurrencyRepo.add(data).map(toDomainCurrency).fork(sendError, getPrice);
};

const getCurrency = ({ name }, sendResponse) => {
  const getData = (data) =>
    data ? toDomainCurrency(data) : Err({ message: 'currency not found' });
  const getResult = (response) => response.bimap(sendResponse, sendResponse);
  const getPrice = (currency) => getCurrentPrice(currency, sendResponse);

  return CurrencyRepo.findByName(name).map(getData).fork(getResult, getPrice);
};

const updateCurrency = ({ name, quantity }, sendResponse) => {
  const getError = () => ({ message: 'failed to update currency' });
  const sendError = () => sendResponse(getError());
  const getUpdatedData = () => getCurrency({ name }, sendResponse);

  CurrencyRepo.update({ name }, { quantity }).fork(sendError, getUpdatedData);
};
export { createCurrency, getCurrency, updateCurrency };
