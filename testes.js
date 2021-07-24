import Crocks from 'crocks';
import contramap from 'crocks/pointfree/contramap.js';
import Result from 'crocks/Result/index.js';
import nAry from 'crocks/helpers/nAry.js';
import isNumber from 'crocks/predicates/isNumber.js';
import partial from 'crocks/helpers/partial.js';

const { Ok, Err } = Result;

const { Async, ifElse, fromNode } = Crocks;

const { fromPromise, Resolved, Rejected } = Async;

const log = (label) => (val) => (console.log(label, ': ', val), val);

const delay = (delay, val, cb) => {
  setTimeout(() => (isNumber(val) ? cb(null, val) : cb('No Number')), delay);
};

const callback = (err, data) => {
  err ? log('err')(data) : log('data')(data);
};

const wait500 = partial(delay, 500);

wait500(32, callback);

const awaitAsync = fromNode(delay)