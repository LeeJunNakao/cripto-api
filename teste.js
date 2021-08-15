import Crocks from 'crocks';
import curry from 'crocks/helpers/curry.js';

const { Async, Result } = Crocks;
const { Resolved, Rejected, fromPromise } = Async;
const { Ok, Err } = Result;

// const asyncr = Async((reject, resolve) => resolve('eu'));
// const promise = new Promise((resolve, reject) => resolve('ok'));

// const log = (label) => (data) => console.log(label, data);
// const fn = fromPromise(() => promise);

// fn().fork(log('error'), log('success'))

// const get = Async((reject, resolve) => reject({ name: 'cardano', qty: 50 }));

// const update = Async((reject, resolve) => {
//   get.fork(
//     (error) => {
//       reject({ error: 'could not get' });
//     },
//     (response) => {
//       resolve({ sucess: response });
//     },
//   );
// });

// update.fork(
//   (i) => console.log('error', i),
//   (i) => console.log('success', i),
// );
