import { object, number, string } from 'superstruct';
import { validateDomain as validate } from './utils.js';

const CurrencyDomain = object({
  id: string(),
  name: string(),
  currentPrice: number(),
  quantity: number(),
});

const Currency = validate(CurrencyDomain);

export { Currency };
