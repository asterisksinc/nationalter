import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

////////////////////////////////////////////////
// GET /api/blogs  — fetch all published blogs
//   ?title=ai          (search title)
//   ?page=1&limit=10   (pagination)
////////////////////////////////////////////////

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (title) {
      whereClause.title = { contains: title, mode: "insensitive" };
    }

    const blogs = await prisma.blog.findMany({
      where: whereClause,
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
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    const total = await prisma.blog.count({ where: whereClause });

    const formattedBlogs = blogs.map((blog) => {
      const name =
        blog.author.registration?.researcher?.name ||
        blog.author.registration?.medical?.name ||
        blog.author.registration?.orgReg?.name ||
        blog.author.email.split("@")[0];

      return {
        id: blog.id,
        nationciteId: blog.nationciteId,
        title: blog.title,
        coverImage: blog.coverImage,
        intro: blog.intro,
        sections: blog.sections,
        conclusion: blog.conclusion,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        author: { id: blog.author.id, email: blog.author.email, role: blog.author.role, name },
      };
    });

    return NextResponse.json({ success: true, total, page, limit, blogs: formattedBlogs });
  } catch (error) {
    console.error("FETCH_BLOGS_ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch blogs" }, { status: 500 });
  }
}
