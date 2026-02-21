import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

////////////////////////////////////////////////
// GET /api/blogs/[id] — fetch a single blog
////////////////////////////////////////////////

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const blogId = parseInt(params.id);

    if (isNaN(blogId)) {
      return NextResponse.json({ success: false, message: "Invalid blog ID" }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            role: true,
            registration: {
              select: {
                nationciteId: true,
                researcher: { select: { name: true } },
                medical: { select: { name: true } },
                orgReg: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    const authorName =
      blog.author.registration?.researcher?.name ||
      blog.author.registration?.medical?.name ||
      blog.author.registration?.orgReg?.name ||
      blog.author.email.split("@")[0];

    return NextResponse.json({
      success: true,
      blog: {
        id: blog.id,
        nationciteId: blog.nationciteId,
        title: blog.title,
        coverImage: blog.coverImage,
        intro: blog.intro,
        sections: blog.sections,
        conclusion: blog.conclusion,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        author: { id: blog.author.id, email: blog.author.email, role: blog.author.role, name: authorName },
      },
    });
  } catch (error) {
    console.error("GET_BLOG_ERROR:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
