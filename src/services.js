import axios from 'axios';
import Async from 'crocks/Async/index.js';
import bimap from 'crocks/pointfree/bimap.js';
import Result from 'crocks/Result/index.js';
import partial from 'crocks/helpers/partial.js';

import CurrencyRepo from './repo.js';
import { pipeAsync, getRepoErr } from './utils.js';
import { toDomainCurrency } from './domain.js';

const { Ok, Err } = Result;

const getCurrentPrice = (data) => {
  const name = data.name;
  const url = `https://api.coingecko.com/api/v3/coins/${name}`;
  return Async((reject, resolve) => {
    axios
      .get(url)
      .then((resp) => {
        resolve(
          Ok({ ...data, price: resp.data.market_data.current_price.brl }),
        );
      })
      .catch(() => {
        reject(Err({ message: 'get current price failed' }));
      });
  });
};

const createCurrency = (data, errCallback) => {
  const addCurrency = () =>
    Async((reject, resolve) => {
      CurrencyRepo.add(data).fork(getRepoErr(reject), (resp) => {
        resolve(toDomainCurrency(resp));
      });
    });

  return partial(pipeAsync, Ok(data), errCallback, addCurrency, () =>
    getCurrentPrice(data),
  );
};

const getCurrency = ({ name }) => {
  return CurrencyRepo.findByName(name).map((data) =>
    data ? toDomainCurrency : { message: 'currency not found' },
  );
};

export { createCurrency, getCurrency };
