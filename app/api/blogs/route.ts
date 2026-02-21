import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

////////////////////////////////////////////////
// GET /api/blogs
////////////////////////////////////////////////
// Supported query params:
//
// ?title=ai
// ?authorName=ashitosh
// ?nationciteId=NC123
// ?page=1
// ?limit=10
//
////////////////////////////////////////////////

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const authorName = searchParams.get("authorName");
    const nationciteId = searchParams.get("nationciteId");

    // pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    ////////////////////////////////////////////////////////
    // Build where clause dynamically
    ////////////////////////////////////////////////////////

    const whereClause: any = {};

    // Filter by title
    if (title) {
      whereClause.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    // Filter by nationciteId
    if (nationciteId) {
      whereClause.nationciteId = nationciteId;
    }

    ////////////////////////////////////////////////////////
    // Filter by author name via Registration relation
    ////////////////////////////////////////////////////////

    if (authorName) {
      whereClause.author = {
        registration: {
          OR: [
            {
              researcher: {
                name: {
                  contains: authorName,
                  mode: "insensitive",
                },
              },
            },
            {
              medical: {
                name: {
                  contains: authorName,
                  mode: "insensitive",
                },
              },
            },
            {
              orgReg: {
                name: {
                  contains: authorName,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
      };
    }

    ////////////////////////////////////////////////////////
    // Query blogs
    ////////////////////////////////////////////////////////

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
                researcher: {
                  select: {
                    name: true,
                  },
                },
                medical: {
                  select: {
                    name: true,
                  },
                },
                orgReg: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: limit,
    });

    ////////////////////////////////////////////////////////
    // Count total for pagination
    ////////////////////////////////////////////////////////

    const total = await prisma.blog.count({
      where: whereClause,
    });

    ////////////////////////////////////////////////////////
    // Format author name cleanly
    ////////////////////////////////////////////////////////

    const formattedBlogs = blogs.map((blog) => {
      const authorName =
        blog.author.registration?.researcher?.name ||
        blog.author.registration?.medical?.name ||
        blog.author.registration?.orgReg?.name ||
        "Unknown";

      return {
        id: blog.id,
        nationciteId: blog.nationciteId,
        title: blog.title,
        subtitle: blog.subtitle,
        mainText: blog.mainText,
        images: blog.images,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,

        author: {
          id: blog.author.id,
          email: blog.author.email,
          role: blog.author.role,
          name: authorName,
        },
      };
    });

    ////////////////////////////////////////////////////////

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      blogs: formattedBlogs,
    });

  } catch (error) {
    console.error("FETCH_BLOGS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      { status: 500 }
    );
  }
}
