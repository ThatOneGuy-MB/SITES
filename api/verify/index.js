export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { hash } = req.query;
  const TOKEN = "2a0519d7a2c69e320e54fe34d99a649772bdf32f73a7ab128c881768009ed6ff";

  if (!hash) return res.status(403).json({ error: "No hash provided." });

  try {
    const response = await fetch(
      `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${TOKEN}&hash=${hash}`
    );
    const data = await response.text();
    res.status(data === "true" ? 200 : 403).json({ access: data === "true" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
