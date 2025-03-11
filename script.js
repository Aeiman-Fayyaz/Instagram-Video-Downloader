document.getElementById('downloadBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const message = document.getElementById('message');

    if (!videoUrl) {
        message.textContent = 'Please enter a valid Instagram video URL.';
        return;
    }

    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: videoUrl }),
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = data.downloadUrl; // Start download
            message.textContent = 'Download started...';
        } else {
            message.textContent = data.message || 'Failed to download the video.';
        }
    } catch (error) {
        message.textContent = 'An error occurred. Please try again.';
        console.error(error);
    }
});