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

  if (!authToken || authToken.length !== 64) {
    console.error('LINKVERTISE_TOKEN is missing or invalid');
    return res.status(500).json({ valid: false, error: 'Missing or invalid LINKVERTISE_TOKEN' });
  }

  try {
    // Construct URL with token and hash as query parameters
    const url = `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${encodeURIComponent(authToken)}&hash=${encodeURIComponent(hash)}`;

    // Send POST request to Linkvertise Anti-Bypassing API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
      // No body, as parameters are in the query string
    });

    const responseBody = await response.text();
    console.log('Linkvertise API response:', {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody
    });

    if (!response.ok) {
      throw new Error(`Linkvertise API responded with status ${response.status}: ${responseBody}`);
    }

    // Parse response (expected: TRUE, FALSE, or error message)
    let data;
    try {
      data = responseBody === 'TRUE' ? true : responseBody === 'FALSE' ? false : JSON.parse(responseBody);
    } catch (parseError) {
      throw new Error(`Failed to parse Linkvertise API response: ${responseBody}`);
    }

    if (data === true) {
      return res.status(200).json({ valid: true });
    } else if (data === false) {
      return res.status(200).json({ valid: false, error: 'Hash not found' }); // Changed to 200, as FALSE is a valid response
    } else {
      return res.status(403).json({ valid: false, error: data || 'Invalid token' });
    }
  } catch (error) {
    console.error('Error in /api/verify:', error.message);
    return res.status(500).json({ valid: false, error: `Server error: ${error.message}` });
  }
};
