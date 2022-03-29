import express, {Express, Request, Response} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

import {setRoutes} from './helpers/setRoutes';

dotenv.config();
const port = process.env.PORT;

const app: Express = express();

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
    res.send('The server is up and running');
});

void setRoutes(app);

app.listen(port || 8000);