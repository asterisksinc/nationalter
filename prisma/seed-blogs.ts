import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding blog posts...\n");

    // Find or create an admin user to associate with blogs
    let adminUser = await prisma.authUser.findFirst({
        where: { role: "ADMIN" },
    });

    if (!adminUser) {
        // Check if there's any user
        adminUser = await prisma.authUser.findFirst();
    }

    if (!adminUser) {
        // Create a placeholder admin user
        const hashedPassword = await bcrypt.hash("admin123", 12);
        adminUser = await prisma.authUser.create({
            data: {
                email: "admin@nationcite.com",
                passwordHash: hashedPassword,
                role: "ADMIN",
                isEmailVerified: true,
                isActive: true,
            },
        });
        console.log("  Created placeholder admin user (admin@nationcite.com / admin123)");
    }

    console.log(`  Using author: ${adminUser.email} (id: ${adminUser.id})\n`);

    const blogs = [
        {
            title: "The Future of Open Access Publishing in Academic Research",
            coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200",
            intro:
                "Open access publishing is reshaping the landscape of academic research by making scholarly work freely available to anyone with an internet connection. As institutions worldwide grapple with rising subscription costs and the demand for transparent science, the open access model offers a promising alternative that aligns with the principles of knowledge democratization.",
            sections: [
                {
                    heading: "The Rise of Open Access Models",
                    text: "Over the past two decades, open access has evolved from a niche movement to a mainstream publishing paradigm. Initiatives like Plan S by cOAlition S mandate that research funded by public grants must be published in open access journals. Universities across Europe and North America are renegotiating their contracts with traditional publishers, increasingly favouring open access agreements.",
                },
                {
                    heading: "Challenges Facing the Open Access Movement",
                    text: "Despite its momentum, open access faces significant hurdles. Article processing charges (APCs) can be prohibitively expensive, sometimes exceeding $5,000 per article. This creates an unequal playing field where well-funded institutions can afford to publish openly while researchers in developing countries remain locked out. Predatory journals also exploit the model, charging fees while providing minimal peer review.",
                },
                {
                    heading: "What the Future Holds",
                    text: "Emerging solutions like diamond open access—where neither authors nor readers pay—are gaining traction. Preprint servers like arXiv and bioRxiv offer immediate dissemination before peer review. Blockchain-based systems for transparent peer review and AI-assisted quality checks could further transform how we publish and consume research.",
                },
            ],
            conclusion:
                "Open access publishing represents a fundamental shift in how knowledge is shared globally. While challenges remain, the trajectory is clear: the future of scholarly communication is open, inclusive, and technologically driven.",
        },
        {
            title: "How AI is Transforming Peer Review in Scientific Journals",
            coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
            intro:
                "Artificial intelligence is beginning to play a pivotal role in the peer review process, one of the most critical yet time-consuming aspects of academic publishing. From detecting plagiarism to assessing statistical validity, AI tools are augmenting human reviewers and potentially reducing the months-long delays that plague traditional review cycles.",
            sections: [
                {
                    heading: "AI-Powered Plagiarism and Integrity Checks",
                    text: "Modern AI systems go beyond simple text matching. They can identify paraphrased content, detect image manipulation in figures, and flag suspicious data patterns. Publishers like Elsevier and Springer Nature already deploy such tools to screen submissions before they reach human reviewers, catching issues that might otherwise slip through.",
                },
                {
                    heading: "Automated Review Assistance",
                    text: "Large language models are being tested as review assistants that can summarize papers, check methodology against best practices, and even suggest relevant literature that authors may have missed. While no publisher has replaced human reviewers with AI, tools like SciScore and Statcheck provide automated assessments that complement expert evaluation.",
                },
                {
                    heading: "Ethical Considerations and Limitations",
                    text: "The use of AI in peer review raises important questions about transparency and bias. If an AI system recommends rejection, who bears responsibility? Can machine learning models trained on historical data perpetuate existing biases? The academic community must establish clear guidelines for AI involvement in editorial decisions.",
                },
            ],
            conclusion:
                "AI will not replace the nuanced judgment of expert peer reviewers, but it can make the process faster, more consistent, and more thorough. The key lies in thoughtful integration that preserves scientific rigour while embracing efficiency.",
        },
        {
            title: "Bridging the Research Gap: Collaboration Between Industry and Academia",
            coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200",
            intro:
                "The divide between academic research and industry application has long been a barrier to innovation. While universities excel at fundamental discoveries, translating those findings into real-world products and services requires collaboration with industry partners who understand market needs and have the resources for commercialization.",
            sections: [
                {
                    heading: "Successful Models of Collaboration",
                    text: "Some of the most impactful innovations of the 21st century emerged from university-industry partnerships. Stanford's collaboration with technology companies spawned Silicon Valley giants. MIT's Industrial Liaison Program connects faculty with over 200 companies. Germany's Fraunhofer Institutes serve as a bridge, conducting applied research funded jointly by government and industry.",
                },
                {
                    heading: "Overcoming Cultural and Structural Barriers",
                    text: "Academic researchers prioritize publications and citations, while industry values patents and products. Bridging this gap requires structural changes: joint appointments, industry sabbaticals for professors, flexible intellectual property frameworks, and funding mechanisms that reward applied outcomes alongside scholarly impact.",
                },
                {
                    heading: "The Role of Technology Transfer Offices",
                    text: "University technology transfer offices (TTOs) play a crucial role in moving research from lab to market. Effective TTOs not only handle patent applications but also foster entrepreneurial culture, connect researchers with venture capital, and provide mentorship for faculty startups.",
                },
            ],
            conclusion:
                "Bridging the research gap is not just about funding—it requires a cultural shift where both academia and industry recognize the value of interdisciplinary collaboration and create sustainable structures for knowledge exchange.",
        },
        {
            title: "The Impact of Research Metrics on Academic Career Development",
            coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
            intro:
                "Research metrics such as the h-index, journal impact factor, and citation counts have become ubiquitous in academic hiring, promotion, and funding decisions. While these quantitative measures offer a convenient way to assess research output, their overuse has sparked a growing debate about whether they truly capture the quality and impact of scholarly work.",
            sections: [
                {
                    heading: "The Dominance of Quantitative Metrics",
                    text: "Institutions worldwide rely heavily on metrics for evaluation. The h-index, which combines publication count with citation impact, is often used as a shorthand for a researcher's quality. Journal impact factors influence where scientists submit their work. These numbers shape careers, determine funding allocations, and even influence national research policies.",
                },
                {
                    heading: "The Case Against Metric Overreliance",
                    text: "Initiatives like the San Francisco Declaration on Research Assessment (DORA) and the Leiden Manifesto call for a more nuanced approach. They argue that metrics can discourage risk-taking, penalize interdisciplinary work, and create perverse incentives to pursue trendy topics rather than important questions. Researchers in the humanities and social sciences are particularly disadvantaged.",
                },
                {
                    heading: "Towards Responsible Research Assessment",
                    text: "A growing number of institutions are adopting narrative-based CVs, recognizing diverse outputs like datasets, software, and policy contributions alongside traditional publications. Some funding agencies now explicitly ask applicants to describe their best contributions rather than listing metrics, encouraging a more holistic view of research impact.",
                },
            ],
            conclusion:
                "Moving beyond simplistic metrics towards responsible research assessment is essential for fostering innovation and equity in academia. The goal should be a system that values quality, impact, and diversity of contributions over raw numbers.",
        },
    ];

    for (const blogData of blogs) {
        await prisma.blog.create({
            data: {
                nationciteId: "ADMIN",
                title: blogData.title,
                coverImage: blogData.coverImage,
                intro: blogData.intro,
                sections: blogData.sections,
                conclusion: blogData.conclusion,
                authorId: adminUser.id,
            },
        });
        console.log(`  ✅ Created: "${blogData.title.slice(0, 50)}…"`);
    }

    console.log("\n🎉 Seeding complete — 4 blog posts created.");
}

main()
    .catch((e) => {
        console.error("Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
