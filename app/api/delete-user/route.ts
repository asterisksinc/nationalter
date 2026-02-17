import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// DELETE /api/user/delete-user
export async function DELETE(req: NextRequest) {
  try {
    let user;

    try {
      user = requireAuth(req);
    } catch (err: any) {
      return NextResponse.json(
        { success: false, message: err.message || "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.$transaction(async (tx) => {

      const registration = await tx.registration.findUnique({
        where: { authUserId: user.userId }, // ⚠️ IMPORTANT FIX
        include: {
          medical: true,
          researcher: true,
          orgReg: true,
        },
      });

      if (!registration) {
        throw new Error("Registration not found");
      }

      if (registration.medical) {
        await tx.medicalProfessional.delete({
          where: { registrationId: registration.id },
        });
      }

      if (registration.researcher) {
        await tx.researchers.delete({
          where: { registrationId: registration.id },
        });
      }

      if (registration.orgReg) {
        await tx.orgsRegistered.delete({
          where: { registrationId: registration.id },
        });
      }

      await tx.registration.delete({
        where: { id: registration.id },
      });

      await tx.authUser.delete({
        where: { id: user.userId }, // ⚠️ IMPORTANT FIX
      });

    });

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error: any) {
    console.error("Delete user error:", error);

    return NextResponse.json({
      success: false,
      message: error.message || "Internal server error",
    }, { status: 500 });
  }
}
