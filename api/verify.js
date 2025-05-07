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

  // Get Linkvertise authentication token from environment variable
  const authToken = process.env.LINKVERTISE_TOKEN;

  if (!authToken) {
    return res.status(500).json({ valid: false, error: 'Missing LINKVERTISE_TOKEN environment variable' });
  }

  try {
    // Send POST request to Linkvertise Anti-Bypassing API
    const response = await fetch('https://publisher.linkvertise.com/api/v1/anti_bypassing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: authToken, hash })
    });

    const responseBody = await response.text(); // Get raw response
    console.log('Linkvertise API response:', {
      status: response.status,
      body: responseBody
    });

    if (!response.ok) {
      throw new Error(`Linkvertise API responded with status ${response.status}: ${responseBody}`);
    }

    const data = JSON.parse(responseBody);

    if (data === true) {
      return res.status(200).json({ valid: true });
    } else if (data === false) {
      return res.status(403).json({ valid: false, error: 'Hash not found' });
    } else {
      return res.status(403).json({ valid: false, error: data || 'Invalid token' });
    }
  } catch (error) {
    console.error('Error in /api/verify:', error.message);
    return res.status(500).json({ valid: false, error: `Server error: ${error.message}` });
  }
};
