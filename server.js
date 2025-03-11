const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// API endpoint for downloading Instagram videos
app.post('/download', async (req, res) => {
    const { url } = req.body;

    if (!url || !url.includes('instagram.com')) {
        return res.status(400).json({ success: false, message: 'Invalid Instagram URL.' });
    }

    try {
        // Replace this with a real Instagram video downloader API
        const apiUrl = `https://api.savefrom.net/download?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (response.data.videoUrl) {
            res.json({ success: true, downloadUrl: response.data.videoUrl });
        } else {
            res.status(500).json({ success: false, message: 'Video not found.' });
        }
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch video.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});