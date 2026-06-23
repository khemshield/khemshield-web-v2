// Server-side proxy for the "How AI Works" blog post live demo.
// The Groq API key is read from the environment here and never reaches the
// browser. The client posts a { prompt } and we stream Groq's response back.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// Per-IP rate limit: an abuse backstop only. The real per-user daily cap (10/day)
// is enforced in the browser; this just stops scripted bursts against the proxy.
// Kept generous so a shared classroom/office network behind one IP is not blocked.
// State is in-memory, so it is per server instance and resets on redeploy, which
// is acceptable for a backstop. Swap in Redis/Upstash for strict multi-instance limits.
const RATE_LIMIT = 20; // max requests
const RATE_WINDOW_MS = 60_000; // per minute, per IP
const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    // Opportunistic cleanup so the map can't grow unbounded.
    if (hits.size > 5000) {
      hits.forEach((value, key) => {
        if (now > value.resetAt) hits.delete(key);
      });
    }
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: Request) {
  if (isRateLimited(clientIp(req))) {
    return Response.json(
      {
        error: {
          message:
            "You are sending requests too quickly. Please wait a minute and try again.",
        },
      },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: { message: "The live demo is not configured yet." } },
      { status: 503 }
    );
  }

  let prompt = "";
  try {
    const body = await req.json();
    prompt = String(body?.prompt ?? "").slice(0, 1000);
  } catch {
    // fall through to the empty-prompt check below
  }

  if (!prompt.trim()) {
    return Response.json(
      { error: { message: "Please type a prompt first." } },
      { status: 400 }
    );
  }

  const groqRes = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 180,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant demonstrating AI text generation for a classroom. Give a clear, accurate, concise answer in 2-4 sentences. Do not mention that you are an AI or that this is a demonstration.",
        },
        { role: "user", content: prompt },
      ],
      stream: true,
    }),
  });

  if (!groqRes.ok || !groqRes.body) {
    const detail = await groqRes.text().catch(() => "");
    return Response.json(
      { error: { message: "The model service returned an error.", detail } },
      { status: groqRes.status || 502 }
    );
  }

  // Stream Groq's Server-Sent Events straight back to the browser.
  return new Response(groqRes.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
