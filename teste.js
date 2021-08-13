import curry from 'crocks/helpers/curry.js';


const say = curry((a, b, c) => a + b  + c);

const result = say(10, 20, 50)

console.log(result)