import { object, number, string, optional } from 'superstruct';
import { validateDomain as validate } from './utils.js';

const CurrencyDomain = object({
  id: string(),
  name: string(),
  currentPrice: optional(number()),
  quantity: number(),
});

const toDomainCurrency = ({ _id, name, currentPrice, quantity }) =>
  Currency({
    id: _id.toString(),
    name,
    currentPrice,
    quantity,
  });


const Currency = validate(CurrencyDomain);

export { Currency, toDomainCurrency };
