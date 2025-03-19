export const runtime = "edge";

interface PostRequestBody {
  prompt: string;
  style?: string;
  aspect_ratio?: string;
  seed?: string;
}

export async function POST(request: Request): Promise<Response> {
  const { prompt, style = "realistic", aspect_ratio = "1:1", seed = "5" }: PostRequestBody =
    await request.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer vk-tmmUHQgIngRYYNx33je4LFQ72DZ5Es09A2mqanhVCbus8V");

  const formdata = new FormData();
  formdata.append("prompt", prompt);
  formdata.append("style", style);
  formdata.append("aspect_ratio", aspect_ratio);
  formdata.append("seed", seed);

  const response: Response = await fetch("https://api.vyro.ai/v2/image/generations", {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  });

  if (!response.ok) {
    const errorText: string = await response.text();
    return new Response(JSON.stringify({ success: false, error: `API Error: ${errorText}` }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const imageBuffer: ArrayBuffer = await response.arrayBuffer();
  const contentType: string = response.headers.get("Content-Type") || "image/png";

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
    },
  });
}