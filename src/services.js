import axios from 'axios';
import Async from 'crocks/Async/index.js';
import Result from 'crocks/Result/index.js';

import CurrencyRepo from './repo.js';
import { toDomainCurrency } from './domain.js';

const { Err } = Result;

const createCurrency = (data) => {
  return CurrencyRepo.add(data)
    .map(toDomainCurrency)
    .map((result) => ({ result }));
};

const getCurrency = ({ name }) => {
  const getData = (data) =>
    data
      ? { result: toDomainCurrency(data) }
      : { error: Err({ message: 'currency not found' }) };

  return CurrencyRepo.findByName(name).map(getData);
};

const updateCurrency = ({ name, quantity }, sendResponse) =>
  CurrencyRepo.update({ name }, { quantity }).map((result) => ({ result }));

export { createCurrency, getCurrency, updateCurrency };
