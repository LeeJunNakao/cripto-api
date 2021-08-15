import { object, number, string, optional } from 'superstruct';
import { validateDomain as validate } from './utils.js';

const CurrencyDomain = object({
  id: string(),
  name: string(),
  currentPrice: optional(number()),
  quantity: number(),
});

const Currency = validate(CurrencyDomain);

const toDomainCurrency = ({ _id, name, currentPrice, quantity }) => {
  return Currency({
    id: _id && _id.toString(),
    name,
    currentPrice,
    quantity,
  });
};

export { Currency, toDomainCurrency };
