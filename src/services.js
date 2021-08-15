import axios from 'axios';
import Async from 'crocks/Async/index.js';
import Result from 'crocks/Result/index.js';

import CurrencyRepo from './repo.js';
import { toDomainCurrency } from './domain.js';

const { Err } = Result;

const createCurrency = (data) => {
  return CurrencyRepo.add(data).map(toDomainCurrency);
};

const getCurrency = ({ name }) => {
  const getData = (data) =>
    data ? toDomainCurrency(data) : Err({ message: 'currency not found' });

  return CurrencyRepo.findByName(name).map(getData);
};

const updateCurrency = ({ name, quantity }) =>
  CurrencyRepo.update({ name }, { quantity });

export { createCurrency, getCurrency, updateCurrency };
