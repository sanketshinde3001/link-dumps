import express, { Request, Response } from 'express';
import videoRoutes from './routes/linkRoutes.js'
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors';

const app = express();
app.use(express.json());
const port = 3000;


// Enable CORS
app.use(cors());

// Use the video routes
app.use('/api', videoRoutes);
app.use('/auth', authRoutes);

app.get('/', (req: Request,res: Response) => {
    res.send('Hello, world!');
});

app.post('/upload', (req: Request, res: Response) => {
    console.log(req.body);
    res.send('Upload successful!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});