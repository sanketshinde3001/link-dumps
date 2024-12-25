import express, { Request, Response } from 'express';
import videoRoutes from './routes/videoRoutes.js'

const app = express();
app.use(express.json());
const port = 3000;

// Use the video routes
app.use('/api', videoRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});
app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello, as!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});