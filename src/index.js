import express, { json } from 'express';
import cors from 'cors';
import {routes} from '../src/router.js'

const app = express();
app.use(json());
app.use(cors());
app.use('/', routes);
app.use('/', (err, req, res, next) => {
  if(err){
    return res.json({ error: err.message });
  }
})

app.listen(3000, () => {
  console.log('🚀 on listen localhost:3000')
})