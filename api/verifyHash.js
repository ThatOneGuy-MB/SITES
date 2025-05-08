// api/verifyHash.js

export default async function handler(req, res) {
    const { hash } = req.query;
    const token = 'd05d2b0e7c867c569a0c86a2c4c2559a851eaa8f1f905b5f61b70daab5e8f7ef';  // Your Linkvertise token
    const apiUrl = `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${token}&hash=${hash}`;

    console.log("Received hash:", hash);  // Log the received hash
    console.log("Making request to:", apiUrl);  // Log the full API URL for debugging

    try {
        // Make a request to the Linkvertise API
        const response = await fetch(apiUrl, {
            method: 'POST',  // Or 'GET' depending on what Linkvertise expects
        });

        const rawResponse = await response.text(); // Get the raw response as text

        console.log("Raw Response from Linkvertise:", rawResponse);  // Log the raw response for debugging

        // Try to parse the response as JSON
        let data;
        try {
            data = JSON.parse(rawResponse);  // Attempt to parse as JSON
        } catch (error) {
            console.error("Error parsing response as JSON:", error);
            res.status(500).json({ status: 'error', message: 'Failed to parse JSON response from Linkvertise' });
            return;
        }

        if (data.status === 'success') {
            res.status(200).json({ status: 'success' });
        } else {
            res.status(400).json({ status: 'failure', message: 'Invalid hash' });
        }
    } catch (error) {
        console.error('Error validating hash:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
    }
}
