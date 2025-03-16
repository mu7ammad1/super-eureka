"use server"; // يشير إلى أن هذا الكود يعمل على الخادم فقط

import axios from "axios";

export async function enhanceImage(formData: FormData) {
  try {
    const image = formData.get("image");
    if (!image || !(image instanceof File)) {
      return { success: false, error: "Please select an image" };
    }

    const response = await axios.post(
      "https://api.vyro.ai/v2/image/enhance",
      formData,
      {
        headers: {
          Authorization:
            "Bearer vk-31cdjDBOkkhIgaoF2Mf3cXgNXCfXImejp1e2DqWfJ7IAh",
        },
        responseType: "arraybuffer", // استقبال البيانات كـ ArrayBuffer
      }
    );

    // تحويل ArrayBuffer إلى Buffer ثم إلى Base64
    const buffer = Buffer.from(response.data);
    const base64Image = buffer.toString("base64");

    return { success: true, imageBase64: base64Image };
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || "Error uploading image";
    console.error("Server Error:", err);
    return { success: false, error: errorMessage };
  }
}

export async function BackgroundRemover(formData: FormData) {
  try {
    const image = formData.get("image");
    if (!image || !(image instanceof File)) {
      return { success: false, error: "Please select an image" };
    }

    const response = await axios.post(
      "https://api.vyro.ai/v2/image/background/remover",
      formData,
      {
        headers: {
          Authorization:
            "Bearer vk-31cdjDBOkkhIgaoF2Mf3cXgNXCfXImejp1e2DqWfJ7IAh",
        },
        responseType: "arraybuffer", // استقبال البيانات كـ ArrayBuffer
      }
    );

    // تحويل ArrayBuffer إلى Buffer ثم إلى Base64
    const buffer = Buffer.from(response.data);
    const base64Image = buffer.toString("base64");

    return { success: true, imageBase64: base64Image };
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || "Error removing background";
    console.error("Server Error:", err);
    return { success: false, error: errorMessage };
  }
}



export async function TextToImage(formData: FormData) {
  try {
    const prompt = formData.get("prompt");
    const style = formData.get("style") || "realistic"; // Default style
    if (!prompt || typeof prompt !== "string") {
      return { success: false, error: "Please provide a valid prompt" };
    }

    console.log("TextToImage: Starting with prompt:", prompt, "style:", style);

    const response = await axios.post(
      "https://api.vyro.ai/v2/image/generations",
      formData,
      {
        headers: {
          Authorization: "Bearer vk-31cdjDBOkkhIgaoF2Mf3cXgNXCfXImejp1e2DqWfJ7IAh",
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
      }
    );

    if (!response.data || response.data.byteLength === 0) {
      throw new Error("Empty response from API");
    }

    const buffer = Buffer.from(response.data);
    const base64Image = buffer.toString("base64");

    console.log("TextToImage: Success, image size:", buffer.length);

    return { success: true, imageBase64: base64Image };
  } catch (err: any) {
    const status = err.response?.status;
    let errorMessage = "Error generating image";

    if (err.code === "ECONNABORTED") {
      errorMessage = "Request timed out. Try a simpler prompt.";
    } else if (err.response) {
      errorMessage = err.response.data?.message || `API error: ${status}`;
      if (err.response.data instanceof ArrayBuffer) {
        const text = Buffer.from(err.response.data).toString("utf-8");
        console.error("API Error Response:", text);
        errorMessage = text || errorMessage;
      }
    } else {
      errorMessage = err.message || errorMessage;
    }

    console.error("TextToImage Error:", { message: errorMessage, status, err });
    return { success: false, error: errorMessage };
  }
}









export async function AIResize(formData: FormData) {
  try {
    const prompt = formData.get("prompt");
    const image = formData.get("image");
    const mask = formData.get("mask");

    // التحقق من وجود المعطيات المطلوبة
    if (!prompt || typeof prompt !== "string") {
      return { success: false, error: "Please provide a valid prompt" };
    }
    if (!image || !(image instanceof File)) {
      return { success: false, error: "Please provide an image file" };
    }
    if (!mask || !(mask instanceof File)) {
      return { success: false, error: "Please provide a mask file" };
    }

    const response = await axios.post(
      "https://api.vyro.ai/v2/image/edits/ai-resize",
      formData,
      {
        headers: {
          Authorization: "Bearer vk-31cdjDBOkkhIgaoF2Mf3cXgNXCfXImejp1e2DqWfJ7IAh",
          "Content-Type": "multipart/form-data", // إضافة Content-Type
        },
        responseType: "arraybuffer", // استقبال البيانات كـ ArrayBuffer
      }
    );

    // تحويل ArrayBuffer إلى Buffer ثم إلى Base64
    const buffer = Buffer.from(response.data);
    const base64Image = buffer.toString("base64");

    return { success: true, imageBase64: base64Image };
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || "Error resizing image";
    console.error("Server Error:", err);
    return { success: false, error: errorMessage };
  }
}



export async function RemoveElement(formData: FormData) {
  try {
    const image = formData.get("image");
    const mask = formData.get("mask");

    // التحقق من وجود المعطيات المطلوبة
    if (!image || !(image instanceof File)) {
      return { success: false, error: "Please provide an image file" };
    }
    if (!mask || !(mask instanceof File)) {
      return { success: false, error: "Please provide a mask file" };
    }

    const response = await axios.post(
      "https://api.vyro.ai/v2/image/edits/remove",
      formData,
      {
        headers: {
          Authorization: "Bearer vk-31cdjDBOkkhIgaoF2Mf3cXgNXCfXImejp1e2DqWfJ7IAh",
          "Content-Type": "multipart/form-data", // إضافة Content-Type
        },
        responseType: "arraybuffer", // استقبال البيانات كـ ArrayBuffer
      }
    );

    // تحويل ArrayBuffer إلى Buffer ثم إلى Base64
    const buffer = Buffer.from(response.data);
    const base64Image = buffer.toString("base64");

    return { success: true, imageBase64: base64Image };
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || "Error removing element from image";
    console.error("Server Error:", err);
    return { success: false, error: errorMessage };
  }
}









export async function GenerativeFill(formData: FormData) {
  try {
    const prompt = formData.get("prompt");
    const image = formData.get("image");
    const mask = formData.get("mask");

    // التحقق من وجود المعطيات المطلوبة
    if (!prompt || typeof prompt !== "string") {
      return { success: false, error: "Please provide a valid prompt" };
    }
    if (!image || !(image instanceof File)) {
      return { success: false, error: "Please provide an image file" };
    }
    if (!mask || !(mask instanceof File)) {
      return { success: false, error: "Please provide a mask file" };
    }

    const response = await axios.post(
      "https://api.vyro.ai/v2/image/edits/generative-fill",
      formData,
      {
        headers: {
          Authorization: "Bearer vk-31cdjDBOkkhIgaoF2Mf3cXgNXCfXImejp1e2DqWfJ7IAh",
          "Content-Type": "multipart/form-data", // إضافة Content-Type
        },
        responseType: "arraybuffer", // استقبال البيانات كـ ArrayBuffer
      }
    );

    // تحويل ArrayBuffer إلى Buffer ثم إلى Base64
    const buffer = Buffer.from(response.data);
    const base64Image = buffer.toString("base64");

    return { success: true, imageBase64: base64Image };
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || "Error performing generative fill";
    console.error("Server Error:", err);
    return { success: false, error: errorMessage };
  }
}