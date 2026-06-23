// Server-side proxy for the "How AI Works" blog post live demo.
// The Groq API key is read from the environment here and never reaches the
// browser. The client posts a { prompt } and we stream Groq's response back.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: Request) {
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
