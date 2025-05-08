// api/validate-hash.js

export default async function handler(req, res) {
    const { token, hash } = req.query;

    if (!token || !hash) {
        return res.status(400).send('Missing token or hash.');
    }

    // Your Linkvertise API endpoint
    const url = `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=d05d2b0e7c867c569a0c86a2c4c2559a851eaa8f1f905b5f61b70daab5e8f7ef&hash=${hash}`;

    try {
        // Send POST request to Linkvertise API
        const response = await fetch(url, {
            method: 'POST',
        });

        const data = await response.json();

        if (data.status === 'TRUE') {
            // If the hash is valid, show the key
            res.send('<h1>Your Key: 12345-ABCDE</h1>');
        } else {
            // If the hash is invalid, show the "Get Key" button
            res.send('<a href="/api/get-key">Get Key</a>');
        }
    } catch (error) {
        console.error('Error verifying hash:', error);
        res.status(500).send('Internal Server Error');
    }
}
