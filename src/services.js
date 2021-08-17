import Async from 'crocks/Async/index.js';
import Result from 'crocks/Result/index.js';
import curry from 'crocks/helpers/curry.js';

import CurrencyRepo from './repo.js';
import { toDomainCurrency } from './domain.js';

const { Err } = Result;

// currency :: Object ->  Async
const createCurrency = (data) => CurrencyRepo.add(data).map(toDomainCurrency);

// getCurrency :: Object ->  Async
const getCurrency = ({ name }) => {
  const getData = (data) =>
    data ? toDomainCurrency(data) : Err({ message: 'currency not found' });

  return CurrencyRepo.findByName(name).map(getData);
};

// updateCurrency :: Object ->  Async
const updateCurrency = ({ name, quantity }) => {
  const resolveUpdate = curry((reject, resolve, _) =>
    getCurrency({ name }).fork(reject, resolve),
  );

  return Async((reject, resolve) =>
    CurrencyRepo.update({ name }, { quantity }).fork(
      reject,
      resolveUpdate(reject, resolve),
    ),
  );
};
export { createCurrency, getCurrency, updateCurrency };
