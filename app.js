const express = require('express');
const path = require('path');
const localtunnel = require('localtunnel');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/start', (req, res) => {
    // Add your stream start logic here
    res.json({ message: 'Stream started successfully' });
});

app.post('/api/stop', (req, res) => {
    // Add your stream stop logic here
    res.json({ message: 'Stream stopped successfully' });
});

app.get('/api/status', (req, res) => {
    // Add your status check logic here
    res.json({ message: 'Stream is running normally' });
});

// Start the server and create tunnel
async function startServer() {
    try {
        // Start the express server
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        // Create localtunnel
        const tunnel = await localtunnel({ port: port });
        console.log(`Public URL: ${tunnel.url}`);

        tunnel.on('close', () => {
            console.log('Tunnel closed, attempting to reopen...');
            startServer();
        });

    } catch (error) {
        console.error('Server startup error:', error);
        setTimeout(startServer, 5000);
    }
}

startServer();