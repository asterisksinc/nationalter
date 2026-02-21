import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path if needed
import { requireAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Verify JWT and get payload
    const payload = requireAuth(req);

    // 2️⃣ Fetch real user from DB
    const authUser = await prisma.authUser.findUnique({
      where: { id: payload.userId },
    });

    if (!authUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 3️⃣ Check active status
    if (!authUser.isActive) {
      return NextResponse.json(
        { error: "User account is inactive" },
        { status: 403 }
      );
    }

    // 4️⃣ Fetch registration
    const registration = await prisma.registration.findUnique({
      where: { authUserId: authUser.id },
    });

    if (!registration || registration.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Only approved registered users can create blogs" },
        { status: 403 }
      );
    }

    // 5️⃣ Parse body
    const body = await req.json();
    const { title, subtitle, mainText, images } = body;

    if (!title || !mainText) {
      return NextResponse.json(
        { error: "Title and mainText are required" },
        { status: 400 }
      );
    }

    const imageArray = Array.isArray(images) ? images : [];

    // 6️⃣ Create blog
    const blog = await prisma.blog.create({
      data: {
        nationciteId: registration.nationciteId,
        title,
        subtitle,
        mainText,
        images: imageArray,
        authorId: authUser.id,
      },
    });

    return NextResponse.json(
      {
        message: "Blog created successfully",
        blog,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("BLOG_CREATE_ERROR:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 }
    );
  }
}
