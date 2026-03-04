import { S3Client } from "@aws-sdk/client-s3";

let cachedClient: S3Client | null = null;

export function getAwsRegion(): string {
  const region = process.env.AWS_REGION;
  if (!region) throw new Error("AWS_REGION is not set");
  return region;
}

export function getS3BucketName(): string {
  const bucket = process.env.AWS_S3_BUCKET_NAME;
  if (!bucket) throw new Error("AWS_S3_BUCKET_NAME is not set");
  return bucket;
}

export function getS3PublicBaseUrl(): string | null {
  const base = process.env.AWS_S3_PUBLIC_BASE_URL;
  if (!base) return null;
  return base.replace(/\/+$/, "");
}

export function getS3Client(): S3Client {
  if (cachedClient) return cachedClient;

  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId) throw new Error("AWS_ACCESS_KEY_ID is not set");
  if (!secretAccessKey) throw new Error("AWS_SECRET_ACCESS_KEY is not set");

  cachedClient = new S3Client({
    region: getAwsRegion(),
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return cachedClient;
}

export function makeS3Ref(bucket: string, key: string): string {
  return `s3://${bucket}/${key}`;
}

export function parseS3Ref(ref: string): { bucket: string; key: string } | null {
  if (!ref.startsWith("s3://")) return null;
  const withoutScheme = ref.slice("s3://".length);
  const firstSlash = withoutScheme.indexOf("/");
  if (firstSlash <= 0) return null;
  const bucket = withoutScheme.slice(0, firstSlash);
  const key = withoutScheme.slice(firstSlash + 1);
  if (!bucket || !key) return null;
  return { bucket, key };
}

export function sanitizeFilename(filename: string): string {
  return filename
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .slice(0, 120);
}
