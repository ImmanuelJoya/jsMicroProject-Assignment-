import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import itemsData from './data/items.json' with { type: 'json' };

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware to serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/items', (req, res) => {
    try {
        res.json(itemsData);
    } catch (error) {
        res.status(500).json({ error: "something Ain't right!, Failed to load items" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'about.html'));
});

app.get('/api-demo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'api-demo.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'contact.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});