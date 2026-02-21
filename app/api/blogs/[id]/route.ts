import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {

    //////////////////////////////////////////////////////
    // 1️⃣ Auth
    //////////////////////////////////////////////////////
    const authUser = requireAuth(req);

    //////////////////////////////////////////////////////
    // 2️⃣ Params
    //////////////////////////////////////////////////////
    const params = await context.params;
    const blogId = parseInt(params.id);

    if (isNaN(blogId)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    //////////////////////////////////////////////////////
    // 3️⃣ Get blog
    //////////////////////////////////////////////////////
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    //////////////////////////////////////////////////////
    // 4️⃣ Ownership check (FIX HERE)
    //////////////////////////////////////////////////////
    if (existingBlog.authorId !== authUser.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authorized to update this blog",
        },
        { status: 403 }
      );
    }

    //////////////////////////////////////////////////////
    // 5️⃣ Body
    //////////////////////////////////////////////////////
    const body = await req.json();
    const { title, subtitle, mainText, images } = body;

    if (
      title === undefined &&
      subtitle === undefined &&
      mainText === undefined &&
      images === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide at least one field to update",
        },
        { status: 400 }
      );
    }

    let imageArray: string[] | undefined;

    if (images !== undefined) {
      if (!Array.isArray(images)) {
        return NextResponse.json(
          {
            success: false,
            message: "Images must be an array",
          },
          { status: 400 }
        );
      }

      imageArray = images;
    }

    //////////////////////////////////////////////////////
    // 6️⃣ Update
    //////////////////////////////////////////////////////
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(mainText !== undefined && { mainText }),
        ...(imageArray !== undefined && { images: imageArray }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );

  }
}

//////////////////////////////////////////////////////
// DELETE BLOG
//////////////////////////////////////////////////////
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {

    //////////////////////////////////////////////////////
    // 1️⃣ Auth
    //////////////////////////////////////////////////////
    const authUser = requireAuth(req);

    //////////////////////////////////////////////////////
    // 2️⃣ Params
    //////////////////////////////////////////////////////
    const params = await context.params;
    const blogId = parseInt(params.id);

    if (isNaN(blogId)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    //////////////////////////////////////////////////////
    // 3️⃣ Find blog
    //////////////////////////////////////////////////////
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    //////////////////////////////////////////////////////
    // 4️⃣ Ownership check
    //////////////////////////////////////////////////////
    if (existingBlog.authorId !== authUser.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authorized to delete this blog",
        },
        { status: 403 }
      );
    }

    //////////////////////////////////////////////////////
    // 5️⃣ Delete
    //////////////////////////////////////////////////////
    await prisma.blog.delete({
      where: { id: blogId },
    });

    //////////////////////////////////////////////////////
    // 6️⃣ Response
    //////////////////////////////////////////////////////
    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {

    console.error("DELETE_BLOG_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );

  }
}
