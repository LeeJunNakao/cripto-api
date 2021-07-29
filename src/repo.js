import Crocks from 'crocks';
import mongoose from 'mongoose';

const { Async } = Crocks;

const { fromPromise } = Async;

const CurrencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { collection: 'currency' }
);

const CurrencyModel = mongoose.model('Currency', CurrencySchema);

const CurrencyRepo = ({ CurrencyModel }) => ({
  add: (currencyData) => {
    const { name, currentPrice, quantity } = currencyData;
    const createCurrency = fromPromise((data) => CurrencyModel.create(data));
    return createCurrency({ name, currentPrice, quantity });
  },
  findByName: (name) => {
    const getCurrency = fromPromise((name) => CurrencyModel.findOne({ name }));
    return getCurrency(name);
  },
  update: (filter, value) => {
    const updateCurrency = fromPromise(() => CurrencyModel.updateOne(filter, value));
    return updateCurrency()
  }
});

export default CurrencyRepo({ CurrencyModel });
