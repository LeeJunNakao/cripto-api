import Crocks from 'crocks';
import map from 'crocks/pointfree/map.js';
import Result from 'crocks/Result/index.js';
import nAry from 'crocks/helpers/nAry.js';
import isNumber from 'crocks/predicates/isNumber.js';
import partial from 'crocks/helpers/partial.js';

const { Ok, Err } = Result;

const { Async, ifElse, fromNode } = Crocks;

const { fromPromise, Resolved, Rejected } = Async;

const pipeAsync = (value, ...functions) => {
  const exec = (v, ...fns) => {
    const [fn, ...rfns] = fns;
    if (fn) {
      fn(v).fork(
        () => pipeAsync(v, ...rfns),
        (data) => {
          pipeAsync(data, ...rfns);
        }
      );
    }
  };

  if (functions.length > 0) exec(value, ...functions);
  return (...f) => exec(value, ...f);
};

const log = (value) =>
  Async((reject, resolve) => {
    console.log(value.toString());
    resolve(value);
  });

const isGreater5 = (i) => (i > 5 ? Result(i - 1) : Err(i));
const doit = (value) =>
  Async((reject, resolve) => {
    const result = value.chain(isGreater5);
    resolve(result);
  });

const p = partial(pipeAsync, Ok(8), doit, doit, doit, doit, doit);
p(log);

// const ob = Ok({name: "kellogs"});

// const result = ob.map((data) => ({name: data.name, url: `http://${data.name}`}))
// console.log(result.toString())

// const result = ob.chain((data) => Ok({name: data.name, url: `http://${data.name}`}))
// console.log(result.toString())

// const log = (label) => (val) => (console.log(label, ': ', val), val);

// const delay = (delay, val, cb) => {
//   setTimeout(() => (isNumber(val) ? cb(null, val) : cb('No Number')), delay);
// };

// const callback = (err, data) => {
//   err ? log('err')(data) : log('data')(data);
// };

// const wait500 = partial(delay, 500);

// wait500(32, callback);

// const awaitAsync = fromNode(delay)

// -----------------------------------------------------------------------------------
// const log = label => data => {
//   console.log(label, " ", data);
//   return Err(data)
// }

// const data = Err({name: "James"});

// data.bichain(log("reject:"), log("success:")).chain(log("final:"))

//------------------------------------------------------------------------------------------

// const data = Ok({ name: 'cardano', price: 5 });

// const r = data
//   .map((i) => {
//     console.log(i);
//     return i;
//   })
//   .map((k) => {
//     console.log('oooi', k);
//     return { ...k, end: true };
//   });

// console.log(r.toString());
