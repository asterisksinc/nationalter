import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest) {
    try {
        requireAdmin(req);

        const body = await req.json();
        const { nationciteId, type, authUser, profileData, publicData } = body;

        if (!nationciteId || !type) {
            return NextResponse.json(
                { error: "nationciteId and type are required" },
                { status: 400 }
            );
        }

        const results: Record<string, any> = {};

        // --- Update AuthUser ---
        if (authUser) {
            const registration = await prisma.registration.findFirst({
                where: { nationciteId },
                select: { authUserId: true },
            });

            if (registration?.authUserId) {
                const updateData: any = {};
                if (typeof authUser.isActive === "boolean")
                    updateData.isActive = authUser.isActive;

                if (Object.keys(updateData).length > 0) {
                    results.authUser = await prisma.authUser.update({
                        where: { id: registration.authUserId },
                        data: updateData,
                        select: { id: true, email: true, isActive: true, role: true },
                    });
                }
            }
        }

        // --- Update Registration status ---
        if (profileData?.registrationStatus) {
            results.registrationStatus = await prisma.registration.updateMany({
                where: { nationciteId },
                data: { status: profileData.registrationStatus },
            });
        }

        // --- Update profile data (Researcher / Medical / Org) ---
        if (profileData) {
            const { registrationStatus, ...profileFields } = profileData;

            if (type === "RESEARCHER") {
                results.profileData = await prisma.researchers.updateMany({
                    where: { nationciteId },
                    data: {
                        ...(profileFields.name !== undefined && { name: profileFields.name }),
                        ...(profileFields.institute !== undefined && { institute: profileFields.institute }),
                        ...(profileFields.email !== undefined && { email: profileFields.email }),
                        ...(profileFields.instituteEmail !== undefined && { instituteEmail: profileFields.instituteEmail }),
                        ...(profileFields.mobile !== undefined && { mobile: profileFields.mobile }),
                        ...(profileFields.orcidId !== undefined && { orcidId: profileFields.orcidId }),
                        ...(profileFields.primaryDomain !== undefined && { primaryDomain: profileFields.primaryDomain }),
                        ...(profileFields.googleScholarUrl !== undefined && { googleScholarUrl: profileFields.googleScholarUrl }),
                        ...(profileFields.profilePhotoUrl !== undefined && { profilePhotoUrl: profileFields.profilePhotoUrl }),
                        ...(profileFields.institutionalIdCardUrl !== undefined && { institutionalIdCardUrl: profileFields.institutionalIdCardUrl }),
                        ...(profileFields.plan !== undefined && { plan: profileFields.plan }),
                        ...(profileFields.status !== undefined && { status: profileFields.status }),
                        ...(profileFields.city !== undefined && { city: profileFields.city }),
                        ...(profileFields.state !== undefined && { state: profileFields.state }),
                    },
                });
            } else if (type === "MEDICAL") {
                results.profileData = await prisma.medicalProfessional.updateMany({
                    where: { nationciteId },
                    data: {
                        ...(profileFields.name !== undefined && { name: profileFields.name }),
                        ...(profileFields.email !== undefined && { email: profileFields.email }),
                        ...(profileFields.mobile !== undefined && { mobile: profileFields.mobile }),
                        ...(profileFields.medCouncilRegNo !== undefined && { medCouncilRegNo: profileFields.medCouncilRegNo }),
                        ...(profileFields.stateCouncil !== undefined && { stateCouncil: profileFields.stateCouncil }),
                        ...(profileFields.primaryHospital !== undefined && { primaryHospital: profileFields.primaryHospital }),
                        ...(profileFields.specialty !== undefined && { specialty: profileFields.specialty }),
                        ...(profileFields.researchFocus !== undefined && { researchFocus: profileFields.researchFocus }),
                        ...(profileFields.medicalDegreeUrl !== undefined && { medicalDegreeUrl: profileFields.medicalDegreeUrl }),
                        ...(profileFields.regCertificateUrl !== undefined && { regCertificateUrl: profileFields.regCertificateUrl }),
                        ...(profileFields.plan !== undefined && { plan: profileFields.plan }),
                        ...(profileFields.status !== undefined && { status: profileFields.status }),
                        ...(profileFields.city !== undefined && { city: profileFields.city }),
                        ...(profileFields.state !== undefined && { state: profileFields.state }),
                    },
                });
            } else if (type === "ORG") {
                results.profileData = await prisma.orgsRegistered.updateMany({
                    where: { nationciteId },
                    data: {
                        ...(profileFields.name !== undefined && { name: profileFields.name }),
                        ...(profileFields.domain !== undefined && { domain: profileFields.domain }),
                        ...(profileFields.email !== undefined && { email: profileFields.email }),
                        ...(profileFields.number !== undefined && { number: profileFields.number }),
                        ...(profileFields.letterOfAuthorizationUrl !== undefined && { letterOfAuthorizationUrl: profileFields.letterOfAuthorizationUrl }),
                        ...(profileFields.accreditationProofUrl !== undefined && { accreditationProofUrl: profileFields.accreditationProofUrl }),
                        ...(profileFields.plan !== undefined && { plan: profileFields.plan }),
                        ...(profileFields.status !== undefined && { status: profileFields.status }),
                        ...(profileFields.city !== undefined && { city: profileFields.city }),
                        ...(profileFields.state !== undefined && { state: profileFields.state }),
                    },
                });
            }
        }

        // --- Update Public Index Data ---
        if (publicData) {
            if (type === "ORG") {
                const existing = await prisma.orgsPublic.findUnique({ where: { nationciteId } });
                if (existing) {
                    results.publicData = await prisma.orgsPublic.update({
                        where: { nationciteId },
                        data: {
                            ...(publicData.orgName !== undefined && { orgName: publicData.orgName }),
                            ...(publicData.worldRank !== undefined && { worldRank: Number(publicData.worldRank) || null }),
                            ...(publicData.countryRank !== undefined && { countryRank: Number(publicData.countryRank) || null }),
                            ...(publicData.hIndexTotal !== undefined && { hIndexTotal: Number(publicData.hIndexTotal) }),
                            ...(publicData.hIndexLast5 !== undefined && { hIndexLast5: Number(publicData.hIndexLast5) }),
                        },
                    });
                }
            } else {
                const existing = await prisma.scholarsPublic.findUnique({ where: { nationciteId } });
                if (existing) {
                    results.publicData = await prisma.scholarsPublic.update({
                        where: { nationciteId },
                        data: {
                            ...(publicData.scholarName !== undefined && { scholarName: publicData.scholarName }),
                            ...(publicData.orgName !== undefined && { orgName: publicData.orgName }),
                            ...(publicData.mainSubject !== undefined && { mainSubject: publicData.mainSubject }),
                            ...(publicData.subField !== undefined && { subField: publicData.subField }),
                            ...(publicData.hIndexTotal !== undefined && { hIndexTotal: Number(publicData.hIndexTotal) }),
                            ...(publicData.hIndexLast5 !== undefined && { hIndexLast5: Number(publicData.hIndexLast5) }),
                            ...(publicData.hIndexRatio !== undefined && { hIndexRatio: parseFloat(publicData.hIndexRatio) }),
                            ...(publicData.worldRank !== undefined && { worldRank: Number(publicData.worldRank) || null }),
                            ...(publicData.countryRank !== undefined && { countryRank: Number(publicData.countryRank) || null }),
                            ...(publicData.universityRank !== undefined && { universityRank: Number(publicData.universityRank) || null }),
                        },
                    });
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: "User updated successfully",
            results,
        });
    } catch (error: any) {
        console.error("user-update error:", error);
        if (error.message === "Unauthorized" || error.message === "Forbidden: Admin access required") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
