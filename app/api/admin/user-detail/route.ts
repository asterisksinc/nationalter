import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        requireAdmin(req);

        const { searchParams } = new URL(req.url);
        const nationciteId = searchParams.get("nationciteId");

        if (!nationciteId) {
            return NextResponse.json(
                { error: "nationciteId is required" },
                { status: 400 }
            );
        }

        // Find the registration for this nationciteId
        const registration = await prisma.registration.findFirst({
            where: { nationciteId },
            include: {
                authUser: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        isActive: true,
                        lastLoginAt: true,
                        createdAt: true,
                    },
                },
                researcher: true,
                medical: true,
                orgReg: true,
            },
        });

        if (!registration) {
            return NextResponse.json(
                { error: "Registration not found for this nationciteId" },
                { status: 404 }
            );
        }

        const regType = registration.type; // RESEARCHER | MEDICAL | ORG

        // Fetch public index data
        let publicData: any = null;
        if (regType === "ORG") {
            publicData = await prisma.orgsPublic.findUnique({
                where: { nationciteId },
            });
        } else {
            publicData = await prisma.scholarsPublic.findUnique({
                where: { nationciteId },
            });
        }

        return NextResponse.json({
            success: true,
            nationciteId,
            type: regType,
            registration: {
                id: registration.id,
                status: registration.status,
                ticketId: registration.ticketId,
                createdAt: registration.createdAt,
            },
            authUser: registration.authUser,
            profileData:
                regType === "RESEARCHER"
                    ? registration.researcher
                    : regType === "MEDICAL"
                        ? registration.medical
                        : registration.orgReg,
            publicData,
        });
    } catch (error: any) {
        console.error("user-detail error:", error);
        if (error.message === "Unauthorized" || error.message === "Forbidden: Admin access required") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
