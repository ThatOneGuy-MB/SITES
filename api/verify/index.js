export default async (req, res) => {
  // Enable CORS and set JSON response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { hash } = req.query;
  const TOKEN = "2a0519d7a2c69e320e54fe34d99a649772bdf32f73a7ab128c881768009ed6ff";

  if (!hash) {
    return res.status(400).json({ error: "No hash provided" });
  }

  try {
    // Verify with Linkvertise API
    const apiUrl = `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${TOKEN}&hash=${hash}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.text();
    return res.status(200).json({ 
      access: data === "true",
      hash: hash // For debugging
    });
    
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ 
      error: "Verification failed",
      details: error.message
    });
  }
};
