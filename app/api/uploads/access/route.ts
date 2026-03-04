import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { requireAuth } from "@/lib/auth";
import { getS3Client, parseS3Ref } from "@/lib/s3";

export async function GET(req: NextRequest) {
  try {
    // Requires an authenticated session; file-level authorization can be tightened
    // later by scoping keys (e.g., per registrationId/userId).
    requireAuth(req);

    const url = new URL(req.url);
    const ref = url.searchParams.get("ref") || "";
    const parsed = parseS3Ref(ref);

    if (!parsed) {
      return NextResponse.json(
        { success: false, message: "Invalid ref" },
        { status: 400 },
      );
    }

    const cmd = new GetObjectCommand({
      Bucket: parsed.bucket,
      Key: parsed.key,
    });

    const signed = await getSignedUrl(getS3Client(), cmd, {
      expiresIn: 60 * 5,
    });

    return NextResponse.json({ success: true, data: { url: signed } });
  } catch (error) {
    console.error("[UPLOADS] access error:", error);
    const message = error instanceof Error ? error.message : "Failed";
    const status = message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ success: false, message }, { status });
  }
}
