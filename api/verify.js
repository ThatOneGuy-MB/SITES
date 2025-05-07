// api/verify.js
export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { hash } = req.body;

  // Validate input
  if (!hash || typeof hash !== 'string' || hash.length !== 64) {
    return res.status(400).json({ valid: false, error: 'Invalid hash' });
  }

  // Linkvertise authentication token
  const authToken = '2a0519d7a2c69e320e54fe34d99a649772bdf32f73a7ab128c881768009ed6ff';

  try {
    // Send POST request to Linkvertise Anti-Bypassing API
    const response = await fetch('https://publisher.linkvertise.com/api/v1/anti_bypassing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: authToken, hash })
    });

    const data = await response.json();

    if (data === true) {
      // Hash is valid
      return res.status(200).json({ valid: true });
    } else if (data === false) {
      // Hash not found
      return res.status(403).json({ valid: false, error: 'Hash not found' });
    } else {
      // Invalid token or other error
      return res.status(403).json({ valid: false, error: data || 'Invalid token' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ valid: false, error: 'Server error' });
  }
};
