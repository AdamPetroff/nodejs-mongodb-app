import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(bodyParser.json());

app.use(router);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Started on port 3000');
});

console.log(app._router.stack);
