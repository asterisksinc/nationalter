import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

////////////////////////////////////////////////
// Admin Blog CMS API — full CRUD
//   POST   — create a blog
//   PUT    — edit a blog
//   DELETE — delete a blog
////////////////////////////////////////////////

export async function POST(req: NextRequest) {
    try {
        const admin = requireAdmin(req);

        const body = await req.json();
        const { title, coverImage, intro, sections, conclusion } = body;

        if (!title || !intro) {
            return NextResponse.json({ success: false, message: "Title and intro are required" }, { status: 400 });
        }

        const sectionArray = Array.isArray(sections) ? sections.slice(0, 3) : [];

        const blog = await prisma.blog.create({
            data: {
                nationciteId: "ADMIN",
                title,
                coverImage: coverImage || null,
                intro,
                sections: sectionArray,
                conclusion: conclusion || null,
                authorId: admin.userId,
            },
        });

        return NextResponse.json({ success: true, message: "Blog created", blog }, { status: 201 });
    } catch (error) {
        console.error("ADMIN_BLOG_CREATE_ERROR:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        requireAdmin(req);

        const body = await req.json();
        const { id, title, coverImage, intro, sections, conclusion } = body;

        if (!id) {
            return NextResponse.json({ success: false, message: "Blog id is required" }, { status: 400 });
        }

        const blog = await prisma.blog.findUnique({ where: { id: parseInt(id) } });
        if (!blog) {
            return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (coverImage !== undefined) updateData.coverImage = coverImage;
        if (intro !== undefined) updateData.intro = intro;
        if (conclusion !== undefined) updateData.conclusion = conclusion;
        if (sections !== undefined) updateData.sections = Array.isArray(sections) ? sections.slice(0, 3) : [];

        const updated = await prisma.blog.update({ where: { id: blog.id }, data: updateData });

        return NextResponse.json({ success: true, message: "Blog updated", blog: updated });
    } catch (error) {
        console.error("ADMIN_BLOG_UPDATE_ERROR:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        requireAdmin(req);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, message: "Blog id is required" }, { status: 400 });
        }

        const blog = await prisma.blog.findUnique({ where: { id: parseInt(id) } });
        if (!blog) {
            return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
        }

        await prisma.blog.delete({ where: { id: blog.id } });

        return NextResponse.json({ success: true, message: "Blog deleted" });
    } catch (error) {
        console.error("ADMIN_BLOG_DELETE_ERROR:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
