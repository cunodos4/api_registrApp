const allowedOrigins: string[] = ['*'];

export const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
};