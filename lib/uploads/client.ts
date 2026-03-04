"use client";

export type UploadResult = {
  ref: string;
  url: string | null;
  key: string;
  bucket: string;
};

export async function uploadFileToS3(file: File, folder: string): Promise<UploadResult> {
  if (!file) throw new Error("No file provided");

  const presignRes = await fetch("/api/uploads/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      size: file.size,
      folder,
    }),
  });

  const presignJson = await presignRes.json();
  if (!presignRes.ok || !presignJson?.success) {
    throw new Error(presignJson?.message || "Failed to create upload URL");
  }

  const { uploadUrl, ref, url, key, bucket } = presignJson.data as {
    uploadUrl: string;
    ref: string;
    url: string | null;
    key: string;
    bucket: string;
  };

  const putRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!putRes.ok) {
    throw new Error("Upload failed");
  }

  return { ref, url, key, bucket };
}

export function pickStoredUploadValue(result: UploadResult): string {
  // Prefer stable public URL if configured, otherwise store an S3 ref.
  return result.url || result.ref;
}

export function isProbablyUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}
