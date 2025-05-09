export default async (req, res) => {
  const { hash } = req.query;
  const LINKVERTISE_TOKEN = "d05d2b0e7c867c569a0c86a2c4c2559a851eaa8f1f905b5f61b70daab5e8f7ef"; // 🔑 Replace this!

  const apiResponse = await fetch(
    `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${LINKVERTISE_TOKEN}&hash=${hash}`
  );

  if (apiResponse.ok && (await apiResponse.text()) === "true") {
    res.status(200).send("OK"); // ✅ Valid hash
  } else {
    res.status(403).send("Access denied!"); // ❌ Invalid hash
  }
};
