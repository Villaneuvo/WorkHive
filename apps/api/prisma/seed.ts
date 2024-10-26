import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Create a user with a profile
    const user1 = await prisma.user.create({
        data: {
            email: "user1@example.com",
            password: await bcrypt.hash("password123", 10),
            name: "John Doe",
            role: "USER",
            verified: true,
            profile: {
                create: {
                    dob: new Date("1990-01-01"),
                    gender: "Male",
                    education: "Bachelor’s Degree in Computer Science",
                    address: "1234 Main St, City, Country",
                },
            },
        },
    });

    // Create an admin user
    const adminUser = await prisma.user.create({
        data: {
            email: "admin1@example.com",
            password: await bcrypt.hash("adminpass123", 10),
            name: "Jessica Theodore",
            role: "ADMIN",
            verified: true,
            Admin: {
                create: {
                    companyName: "Astra Group Indonesia",
                    phoneNumber: "+123456789",
                },
            },
        },
    });

    const adminUser2 = await prisma.user.create({
        data: {
            email: "admin2@example.com",
            password: await bcrypt.hash("adminpass123", 10),
            name: "Imam Al Zulfiki",
            role: "ADMIN",
            verified: true,
            Admin: {
                create: {
                    companyName: "Amazon Web Service Indonesia",
                    phoneNumber: "+123456789",
                },
            },
        },
    });

    const adminUser3 = await prisma.user.create({
        data: {
            email: "admin3@example.com",
            password: await bcrypt.hash("adminpass123", 10),
            name: "Gidhan Radhiyansyah Mahendra",
            role: "ADMIN",
            verified: true,
            Admin: {
                create: {
                    companyName: "Dell Technologies Indonesia",
                    phoneNumber: "+123456789",
                },
            },
        },
    });

    const adminUser4 = await prisma.user.create({
        data: {
            email: "admin4@example.com",
            password: await bcrypt.hash("adminpass123", 10),
            name: "Daffa Radhitya Putra Pratama",
            role: "ADMIN",
            verified: true,
            Admin: {
                create: {
                    companyName: "Google Indonesia",
                    phoneNumber: "+123456789",
                },
            },
        },
    });

    const adminUser5 = await prisma.user.create({
        data: {
            email: "admin5@example.com",
            password: await bcrypt.hash("adminpass123", 10),
            name: "Rafid Fadhillah Al Khadafi",
            role: "ADMIN",
            verified: true,
            Admin: {
                create: {
                    companyName: "Ultra Sakti Indonesia",
                    phoneNumber: "+123456789",
                },
            },
        },
    });

    // Fetch the admin record
    const admin = await prisma.admin.findUnique({
        where: {
            userId: adminUser.id,
        },
    });

    // Create a developer user
    const developerUser = await prisma.user.create({
        data: {
            email: "developer@example.com",
            password: await bcrypt.hash("devpass123", 10),
            name: "Dev User",
            role: "DEVELOPER",
            verified: true,
            Developer: {
                create: {},
            },
        },
    });

    // Fetch the developer record
    const developer = await prisma.developer.findUnique({
        where: {
            userId: developerUser.id,
        },
    });

    // Create job posts with tags
    const job1 = await prisma.jobPost.create({
        data: {
            title: "Software Engineer",
            description: "We are looking for a skilled Software Engineer to join our team.",
            category: "Technology",
            bannerUrl:
                "https://res.cloudinary.com/dkcur9nvf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1729155298/aws_publ0g.png",
            cityLocation: "Kota Semarang",
            provinceLocation: "Jawa Tengah",
            type: "Full-time",
            salary: 8000000,
            applicationDeadline: new Date("2024-12-31"),
            adminId: 2,
            published: true,
            tags: {
                create: [{ name: "JavaScript" }, { name: "React" }, { name: "Node.js" }],
            },
        },
    });

    const job2 = await prisma.jobPost.create({
        data: {
            title: "Data Scientist",
            description: "Analyze and interpret complex data to help our business grow.",
            category: "Technology",
            bannerUrl:
                "https://res.cloudinary.com/dkcur9nvf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1729155298/aws_publ0g.png",
            cityLocation: "Kota Semarang",
            provinceLocation: "Jawa Tengah",
            type: "Full-time",
            salary: 9000000,
            applicationDeadline: new Date("2024-12-31"),
            adminId: 2,
            tags: {
                create: [{ name: "Python" }, { name: "Machine Learning" }, { name: "Data Analysis" }],
            },
        },
    });

    // Job 3
    const job3 = await prisma.jobPost.create({
        data: {
            title: "UI/UX Designer",
            description: "We are seeking a creative UI/UX Designer to improve our product interfaces.",
            category: "Technology",
            bannerUrl: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155298/astra_ozapdd.png",
            cityLocation: "Kota Semarang",
            provinceLocation: "Jawa Tengah",
            type: "Full-time",
            salary: 7500000,
            applicationDeadline: new Date("2024-12-31"),
            adminId: 1,
            tags: {
                create: [{ name: "Figma" }, { name: "Adobe XD" }, { name: "Prototyping" }],
            },
        },
    });

    // Job 4
    const job4 = await prisma.jobPost.create({
        data: {
            title: "Network Engineer",
            description: "Join us as a Network Engineer and help maintain our network infrastructure.",
            category: "Technology",
            bannerUrl: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155298/astra_ozapdd.png",
            cityLocation: "Kota Semarang",
            provinceLocation: "Jawa Tengah",
            type: "Full-time",
            salary: 8500000,
            applicationDeadline: new Date("2024-12-31"),
            adminId: 1,
            tags: {
                create: [{ name: "Networking" }, { name: "Cisco" }, { name: "Firewall" }],
            },
        },
    });

    // Job 5
    const job5 = await prisma.jobPost.create({
        data: {
            title: "Marketing Manager",
            description: "We are hiring a Marketing Manager to lead our marketing team and strategies.",
            category: "Other",
            bannerUrl: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155298/astra_ozapdd.png",
            cityLocation: "Kota Semarang",
            provinceLocation: "Jawa Tengah",
            type: "Full-time",
            salary: 9500000,
            applicationDeadline: new Date("2024-12-31"),
            adminId: 1,
            tags: {
                create: [{ name: "Digital Marketing" }, { name: "SEO" }, { name: "Campaigns" }],
            },
        },
    });

    // Job 6
    const job6 = await prisma.jobPost.create({
        data: {
            title: "Frontend Developer",
            description: "We are seeking a talented Frontend Developer to create stunning web interfaces.",
            category: "Technology",
            bannerUrl: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155298/astra_ozapdd.png",
            cityLocation: "Kota Semarang",
            provinceLocation: "Jawa Tengah",
            type: "Full-time",
            salary: 7800000,
            applicationDeadline: new Date("2024-12-31"),
            adminId: 1,
            tags: {
                create: [{ name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }],
            },
        },
    });

    // Job 7
    const job7 = await prisma.jobPost.create({
        data: {
            title: "HR Specialist",
            description: "We are looking for an experienced HR Specialist to manage our HR processes.",
            category: "Other",
            bannerUrl: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155299/dell_kv8wre.png",
            cityLocation: "Kota Semarang",
            provinceLocation: "Jawa Tengah",
            type: "Full-time",
            salary: 7000000,
            applicationDeadline: new Date("2024-12-31"),
            adminId: 3,
            tags: {
                create: [{ name: "Recruitment" }, { name: "Employee Relations" }, { name: "HR Policies" }],
            },
        },
    });

    // Job 8
    const job8 = await prisma.jobPost.create({
        data: {
            title: "Product Manager",
            description: "Join us as a Product Manager to drive product strategy and delivery.",
            category: "Technology",
            bannerUrl: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155299/dell_kv8wre.png",
            cityLocation: "Kota Semarang",
            provinceLocation: "Jawa Tengah",
            type: "Full-time",
            salary: 9500000,
            applicationDeadline: new Date("2024-12-31"),
            adminId: 3,
            tags: {
                create: [{ name: "Agile" }, { name: "Product Roadmap" }, { name: "Stakeholder Management" }],
            },
        },
    });

    // Job 9 - Kota Surabaya
    const job9 = await prisma.jobPost.create({
        data: {
            title: "Backend Developer",
            description: "We are looking for a Backend Developer to work on our server-side applications.",
            category: "Technology",
            bannerUrl: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155300/ultrasakti_hbhs1i.png",
            cityLocation: "Kota Surabaya",
            provinceLocation: "Jawa Timur",
            type: "Full-time",
            salary: 8500000,
            applicationDeadline: new Date("2024-12-31"),
            adminId: 5,
            tags: {
                create: [{ name: "Node.js" }, { name: "API Development" }, { name: "Database" }],
            },
        },
    });

    // Job 10 - Kota Jakarta
    const job10 = await prisma.jobPost.create({
        data: {
            title: "Content Writer",
            description: "We are hiring a Content Writer to create engaging articles for our audience.",
            category: "Service",
            bannerUrl: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155299/google_xmcbav.png",
            cityLocation: "Kota Jakarta",
            provinceLocation: "Jakarta",
            type: "Full-time",
            salary: 6800000,
            applicationDeadline: new Date("2024-12-31"),
            adminId: 4,
            tags: {
                create: [{ name: "Content Creation" }, { name: "SEO Writing" }, { name: "Copywriting" }],
            },
        },
    });

    // Create skill assessments and questions
    const skillAssessment = await prisma.skillAssessment.create({
        data: {
            skillName: "JavaScript Proficiency",
            questions: {
                create: [
                    { content: "What is a closure in JavaScript?" },
                    {
                        content: "Explain the difference between var, let, and const.",
                    },
                ],
            },
            developerId: developer?.id || 1,
        },
    });

    // Create a subscription for the user
    await prisma.subscription.create({
        data: {
            userId: user1.id,
            subscriptionType: "STANDARD",
            startDate: new Date(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            isActive: true,
        },
    });

    // Create a skill assessment result for the user
    await prisma.skillAssessmentResult.create({
        data: {
            userId: user1.id,
            assessmentId: skillAssessment.id,
            score: 85,
            passed: true,
        },
    });

    // Create a skill badge for the user
    await prisma.skillBadge.create({
        data: {
            userId: user1.id,
            badgeName: "JavaScript Mastery",
        },
    });

    // Create a job application for the user
    await prisma.jobApplication.create({
        data: {
            jobId: job1.id,
            userId: user1.id,
            status: "PENDING",
            cvUrl: "https://example.com/cv/user1.pdf",
            expectedSalary: 8500000,
        },
    });

    // Create a saved job for the user
    await prisma.jobSaved.create({
        data: {
            userId: user1.id,
            jobId: job2.id,
        },
    });

    // Create an entry in the apply list for the user
    await prisma.applyList.create({
        data: {
            userId: user1.id,
            jobPostId: job1.id,
            status: "SUBMITTED",
        },
    });

    console.log("Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
