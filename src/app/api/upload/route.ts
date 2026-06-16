import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided in request" },
        { status: 400 }
      );
    }

    // Basic Validation: check type and size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File exceeds the maximum 10MB limit" },
        { status: 400 }
      );
    }

    // Check if Vercel Blob read-write token is available in env
    const hasVercelBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;

    if (hasVercelBlobToken) {
      console.log(`Uploading ${file.name} to Vercel Blob...`);
      // Upload using official Vercel Blob SDK
      const blob = await put(file.name, file, {
        access: "public",
      });

      return NextResponse.json({
        success: true,
        url: blob.url,
        filename: file.name,
      });
    } else {
      console.log(`Vercel Blob token not found. Falling back to local Base64 URL for ${file.name}...`);
      // Fallback for local dev/showcase: return Base64 Data URL
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const base64Data = buffer.toString("base64");
      const mimeType = file.type || "application/octet-stream";
      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        filename: file.name,
        isFallback: true,
      });
    }
  } catch (error: any) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
