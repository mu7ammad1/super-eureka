// app/api/generate/route.ts
export const runtime = "edge";

export async function POST(request: { json: () => PromiseLike<{ prompt: any; style?: "realistic" | undefined; aspect_ratio?: "1:1" | undefined; seed?: "5" | undefined; }> | { prompt: any; style?: "realistic" | undefined; aspect_ratio?: "1:1" | undefined; seed?: "5" | undefined; }; }) {
  const { prompt, style = "realistic", aspect_ratio = "1:1", seed = "5" } = await request.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer vk-31cdjDBOkkhIgaoF2Mf3cXgNXCfXImejp1e2DqWfJ7IAh");

  const formdata = new FormData();
  formdata.append("prompt", prompt);
  formdata.append("style", style);
  formdata.append("aspect_ratio", aspect_ratio);
  formdata.append("seed", seed);

  const response = await fetch("https://api.vyro.ai/v2/image/generations", {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  });

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(JSON.stringify({ success: false, error: `API Error: ${errorText}` }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  // التعامل مع الصورة الثنائية
  const imageBuffer = await response.arrayBuffer(); // قراءة البيانات كـ ArrayBuffer
  const contentType = response.headers.get("Content-Type") || "image/png"; // افتراض PNG إذا لم يكن محددًا

  // إرجاع الصورة مباشرة كاستجابة
  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
    },
  });
}