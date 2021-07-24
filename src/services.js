import { Currency } from './domain.js';
import CurrencyRepo from './repo.js';
import Async from 'crocks/Async/index.js';
import bimap from 'crocks/pointfree/bimap.js';

const { Resolved, Rejected } = Async;

const toDomainCurrency = ({ _id, name, currentPrice, quantity }) =>
  Currency({
    id: _id.toString(),
    name,
    currentPrice,
    quantity,
  });

const createCurrency = (data) => {
  return CurrencyRepo.add(data).map(toDomainCurrency);
};

const getCurrency = ({ name }) => {
  return CurrencyRepo.findByName(name).map((data) =>
    data ? toDomainCurrency : { message: 'currency not found' }
  );
};

export { createCurrency, getCurrency };
