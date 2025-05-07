export default async (req, res) => {
  const { hash } = req.query;
  const TOKEN = "dd27789b6a6329404901aaed31eae8bb7a91afc9e1c02af87a370dd033c734e2";

  if (!hash) {
    return res.status(403).json({ error: "No hash provided." });
  }

  try {
    const response = await fetch(
      `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${TOKEN}&hash=${hash}`
    );
    const data = await response.text();

    if (data === "true") {
      res.status(200).json({ access: true }); // ✅ Allow access
    } else {
      res.status(403).json({ error: "Invalid hash." }); // ❌ Block
    }
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};
