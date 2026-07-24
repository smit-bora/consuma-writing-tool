export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Gate: require a shared access code so this endpoint (and your API bill)
  // isn't wide open to anyone who finds the URL. Set ACCESS_CODE in Vercel's
  // env vars. Leave it unset to disable the gate entirely (not recommended
  // for a public URL).
  const requiredCode = process.env.ACCESS_CODE;
  if (requiredCode) {
    const providedCode = req.headers["x-access-code"];
    if (providedCode !== requiredCode) {
      return res.status(401).json({ error: "Invalid access code" });
    }
  }

  const apiKey =
  req.headers["x-anthropic-api-key"] ||
  process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  return res.status(401).json({
    error:
      "No Anthropic API key provided. Add one in Settings or configure ANTHROPIC_API_KEY on the server."
  });
}

  const { system, message } = req.body || {};
  if (!system || !message) {
    return res.status(400).json({ error: "Missing system or message in request body" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system,
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Anthropic API error" });
    }

    const text = (data.content || []).map(b => b.text || "").join("\n").trim();
    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unknown server error" });
  }
}
