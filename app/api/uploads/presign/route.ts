import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import {
  getS3BucketName,
  getS3Client,
  getS3PublicBaseUrl,
  makeS3Ref,
  sanitizeFilename,
} from "@/lib/s3";

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15MB

function isAllowedContentType(contentType: string): boolean {
  if (!contentType) return false;
  if (contentType.startsWith("image/")) return true;
  if (contentType === "application/pdf") return true;
  if (contentType === "text/csv") return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const filename = String(body?.filename ?? "");
    const contentType = String(body?.contentType ?? "");
    const folder = String(body?.folder ?? "uploads");
    const size = Number(body?.size ?? 0);

    if (!filename) {
      return NextResponse.json(
        { success: false, message: "filename is required" },
        { status: 400 },
      );
    }

    if (!isAllowedContentType(contentType)) {
      return NextResponse.json(
        { success: false, message: "Unsupported file type" },
        { status: 400 },
      );
    }

    if (!Number.isFinite(size) || size <= 0 || size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: `File must be between 1 byte and ${MAX_UPLOAD_BYTES} bytes`,
        },
        { status: 400 },
      );
    }

    const bucket = getS3BucketName();
    const safeName = sanitizeFilename(filename);
    const id = crypto.randomUUID();

    const normalizedFolder = folder
      .trim()
      .replace(/^\/+/, "")
      .replace(/\/+$/, "")
      .replace(/\.{2,}/g, "")
      .replace(/[^a-zA-Z0-9/_-]/g, "");

    const key = `${normalizedFolder}/${Date.now()}-${id}-${safeName}`;

    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(getS3Client(), cmd, {
      expiresIn: 60 * 5, // 5 minutes
    });

    const publicBase = getS3PublicBaseUrl();
    const publicUrl = publicBase ? `${publicBase}/${key}` : null;

    return NextResponse.json({
      success: true,
      data: {
        bucket,
        key,
        ref: makeS3Ref(bucket, key),
        uploadUrl,
        url: publicUrl,
        expiresInSeconds: 300,
      },
    });
  } catch (error) {
    console.error("[UPLOADS] presign error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create upload URL" },
      { status: 500 },
    );
  }
}
