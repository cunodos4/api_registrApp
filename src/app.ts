import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import { PORT } from './keys';

import { limiter } from './utils/limiter'
import { corsOptions } from './utils/corsOptions'

import userRoutes from './routes/user.routes';
import ramosRoutes from './routes/ramos.routes';
import clasesRoutes from './routes/clases.routes';

export const app = express();


app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));


app.use(cors(corsOptions));
app.use('/api', limiter, userRoutes, ramosRoutes, clasesRoutes);
app.listen(PORT);