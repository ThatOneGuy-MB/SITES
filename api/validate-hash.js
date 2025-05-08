// api/verifyHash.js

export default async function handler(req, res) {
    const { hash } = req.query;
    const token = 'd05d2b0e7c867c569a0c86a2c4c2559a851eaa8f1f905b5f61b70daab5e8f7ef';  // Your Linkvertise token
    const apiUrl = `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${token}&hash=${hash}`;

    try {
        // Make a request to the Linkvertise API
        const response = await fetch(apiUrl, {
            method: 'POST',
        });
        const data = await response.json();

        if (data.status === 'success') {
            res.status(200).json({ status: 'success' });
        } else {
            res.status(400).json({ status: 'failure' });
        }
    } catch (error) {
        console.error('Error validating hash:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
}
