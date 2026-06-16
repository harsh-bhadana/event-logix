import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "../route";
import { put } from "@vercel/blob";

// Mock @vercel/blob
vi.mock("@vercel/blob", () => ({
  put: vi.fn(),
}));

describe("POST /api/upload", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should return a 400 if no file is provided", async () => {
    const mockRequest = {
      formData: async () => {
        const fd = new FormData();
        return fd;
      },
    } as unknown as Request;

    const res = await POST(mockRequest);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toContain("No file provided");
  });

  it("should return a Base64 data URL fallback if BLOB_READ_WRITE_TOKEN is missing", async () => {
    delete process.env.BLOB_READ_WRITE_TOKEN;

    const mockFile = new Blob([new Uint8Array([1, 2, 3])], { type: "image/png" });

    const mockRequest = {
      formData: async () => {
        const fd = new FormData();
        fd.append("file", mockFile, "test.png");
        return fd;
      },
    } as unknown as Request;

    const res = await POST(mockRequest);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.isFallback).toBe(true);
    expect(json.url).toContain("data:image/png;base64,");
    expect(put).not.toHaveBeenCalled();
  });

  it("should upload to Vercel Blob and return URL if BLOB_READ_WRITE_TOKEN is configured", async () => {
    process.env.BLOB_READ_WRITE_TOKEN = "mock_token";
    const mockBlobUrl = "https://example-blob.public.blob.vercel-storage.com/test.png";
    (put as any).mockResolvedValue({ url: mockBlobUrl });

    const mockFile = new Blob([new Uint8Array([1, 2, 3])], { type: "image/png" });

    const mockRequest = {
      formData: async () => {
        const fd = new FormData();
        fd.append("file", mockFile, "test.png");
        return fd;
      },
    } as unknown as Request;

    const res = await POST(mockRequest);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.url).toBe(mockBlobUrl);
    expect(put).toHaveBeenCalledWith("test.png", expect.any(Object), { access: "public" });
  });

  it("should return a 400 if file size exceeds 10MB limit", async () => {
    const largeContent = new Uint8Array(11 * 1024 * 1024); // 11MB
    const mockFile = new Blob([largeContent], { type: "image/png" });

    const mockRequest = {
      formData: async () => {
        const fd = new FormData();
        fd.append("file", mockFile, "large.png");
        return fd;
      },
    } as unknown as Request;

    const res = await POST(mockRequest);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toContain("File exceeds the maximum");
  });
});
