import bimap from 'crocks/pointfree/bimap.js';
import Async from 'crocks/Async/index.js';
import Result from 'crocks/Result/index.js';

import Controller from './controller.js';
import { createCurrency, getCurrency, updateCurrency } from './services.js';

export default Controller({ createCurrency, getCurrency, updateCurrency });
