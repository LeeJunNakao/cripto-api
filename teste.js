import curry from 'crocks/helpers/curry.js';

const say = curry((a, b, c) => console.log(a + b + c));

say(10, 20)(50);
