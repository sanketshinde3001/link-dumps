import express from 'express';
import videoRoutes from './routes/videoRoutes.js';
import cors from 'cors';
const app = express();
app.use(express.json());
const port = 3000;
// Enable CORS
app.use(cors());
// Use the video routes
app.use('/api', videoRoutes);
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.post('/upload', (req, res) => {
    console.log(req.body);
    res.send('Upload successful!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
