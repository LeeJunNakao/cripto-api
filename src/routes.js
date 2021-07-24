import { createCurrency, getCurrency } from './services.js';
import bimap from 'crocks/pointfree/bimap.js';

const failMessage = (res) => () => res.send({ message: 'failed ' });
const getResp = (res) => [failMessage(res), (i) => res.send(i)];

const setRoutes = (app) => {
  app.get('/currency', async (req, res) => {
    getCurrency(req.body).fork(failMessage(res), bimap(...getResp(res)));
  });
  app.post('/currency', async (req, res) => {
    createCurrency(req.body).fork(failMessage(res), bimap(...getResp(res)));
  });
};

export default setRoutes;
