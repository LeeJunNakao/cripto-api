import bimap from 'crocks/pointfree/bimap.js';
import Async from 'crocks/Async/index.js';
import Result from 'crocks/Result/index.js';

import { createCurrency, getCurrency, updateCurrency } from './services.js';

const failMessage = (res) => () => res.send({ message: 'failed ' });
const getResp = (res) => [failMessage(res), (i) => res.send(i)];
const send = (res) => (data) => {
  data.bimap(
    (i) => res.send(i),
    (i) => res.send(i),
  );
};

const setRoutes = (app) => {
  app.get('/currency', async (req, res) => {
    getCurrency(req.query, (data) => res.send(data));
  });
  app.post('/currency', async (req, res) => {
    createCurrency(req.body, (data) => res.send(data));
  });
  app.put('/currency', async (req, res) => {
    updateCurrency(req.body, (data) => res.send(data));
  });
};

export default setRoutes;
