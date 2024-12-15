import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';


import {PORT, limiter, corsOptions} from './barrel'
import userRoutes from './routes/user.routes';
import ramosRoutes from './routes/ramos.routes';
import clasesRoutes from './routes/clases.routes';

export const app = express();


app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));


app.use(cors(corsOptions));
app.use('/api', limiter, userRoutes, ramosRoutes, clasesRoutes);
app.listen(PORT, ()=>console.log(`El servidor está corriendo en el Port:${PORT}`));