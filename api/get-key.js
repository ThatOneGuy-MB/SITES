// api/get-key.js

export default function handler(req, res) {
    const token = 'YOUR_AUTH_TOKEN';  // Use your generated token from Linkvertise
    const userHash = generateHash();  // Generate a unique hash

    // Redirect user to Linkvertise
    res.redirect(`https://linkvertise.com/your-target-link?hash=${userHash}`);
}

function generateHash() {
    return Math.random().toString(36).substring(2);  // Simple hash generator for demonstration
}
