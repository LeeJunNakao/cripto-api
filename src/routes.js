import bimap from 'crocks/pointfree/bimap.js';
import Async from 'crocks/Async/index.js';
import Result from 'crocks/Result/index.js';

import { createCurrency, getCurrency } from './services.js';

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
    getCurrency(req.body).fork(failMessage(res), bimap(...getResp(res)));
  });
  app.post('/currency', async (req, res) => {
    const promise = (resp) =>
      Async((reject, resolve) => {
        res.send(resp);
        resolve(Ok(resp));
      });

    const errCallback = (data) => {
      res.send(data);
    };

    createCurrency(req.body, errCallback)(promise);
  });
};

export default setRoutes;
