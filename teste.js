import Crocks from 'crocks';

const { Async, Result } = Crocks;
const { Resolved, Rejected } = Async;
const { Ok, Err } = Result;

const promise = Async((reject, resolve) => resolve('eu'));
const getResult = ({ name, age }) => {
  return typeof name === 'string' && typeof age === 'number'
    ? Ok({ name, age })
    : Err({ message: 'Invalid fields' });
};

promise.map(getResult).fork(
  ({ error }) => console.log(error),
  (result) => result.map((i) => console.log(i)),
);

const treatErr = () => ({ message: 'error' });
const treatResult = () => ({ message: 'success' });

getResult({ name: 'James', age: 30 })
  .coalesce(treatErr, treatResult)
  .map((i) => console.log(i));
