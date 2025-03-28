export async function POST(request: Request): Promise<Response> {
  const { prompt, style = "realistic", aspect_ratio = "1:1", seed = "5" } =
    await request.json();

  if (!prompt) {
    return new Response(
      JSON.stringify({ success: false, error: "Prompt is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer vk-z4N4bJQf3sxcRemicDRJNW1I1wvJNaDxw5dRyd32eOA01");

  const formdata = new FormData();
  formdata.append("prompt", prompt);
  formdata.append("style", style);
  formdata.append("aspect_ratio", aspect_ratio);
  formdata.append("seed", seed);

  try {
    const response = await fetch("https://api.vyro.ai/v2/image/generations", {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    });

    if (!response.ok) {
      let errorDetails;
      try {
        errorDetails = await response.json(); // Attempt to parse JSON
      } catch {
        errorDetails = { message: await response.text() }; // Fallback to text if JSON fails
      }
      return new Response(
        JSON.stringify({
          success: false,
          error: errorDetails.message || "Failed to generate image",
          code: errorDetails.code || response.status,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("Content-Type") || "image/png";

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}