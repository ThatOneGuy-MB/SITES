export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { hash } = req.query;
  const TOKEN = "2a0519d7a2c69e320e54fe34d99a649772bdf32f73a7ab128c881768009ed6ff";

  if (!hash) {
    return res.status(400).json({ error: "No hash provided" });
  }

  try {
    // New: Add User-Agent header which Linkvertise requires
    const response = await fetch(
      `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${TOKEN}&hash=${hash}`,
      {
        headers: {
          'User-Agent': 'Linkvertise-Verification/1.0'
        }
      }
    );

    // More detailed error handling
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Linkvertise API responded with ${response.status}: ${errorData}`);
    }

    const data = await response.text();
    return res.status(200).json({ 
      access: data === "true",
      hash: hash // For debugging
    });

  } catch (error) {
    console.error('Full verification error:', error);
    return res.status(500).json({ 
      error: "Verification failed",
      details: error.message,
      suggestion: "Check your token and API endpoint"
    });
  }
};
