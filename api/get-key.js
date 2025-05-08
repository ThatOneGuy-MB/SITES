// api/get-key.js

export default function handler(req, res) {
    const token = 'd05d2b0e7c867c569a0c86a2c4c2559a851eaa8f1f905b5f61b70daab5e8f7ef';  // Use your generated token from Linkvertise
    const userHash = generateHash();  // Generate a unique hash

    // Redirect user to Linkvertise
    res.redirect(`https://linkvertise.com/your-target-link?hash=${userHash}`);
}

function generateHash() {
    return Math.random().toString(36).substring(2);  // Simple hash generator for demonstration
}
