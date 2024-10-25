import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Create a user with a profile
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@example.com',
            password: await bcrypt.hash('password123', 10),
            name: 'John Doe',
            role: 'USER',
            verified: true,
            profile: {
                create: {
                    dob: new Date('1990-01-01'),
                    gender: 'Male',
                    education: 'Bachelor’s Degree in Computer Science',
                    address: '1234 Main St, City, Country',
                },
            },
        },
    });

    // Create an admin user
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            password: await bcrypt.hash('adminpass123', 10),
            name: 'Admin User',
            role: 'ADMIN',
            verified: true,
            Admin: {
                create: {
                    companyName: 'Tech Solutions Inc',
                    phoneNumber: '+123456789',
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
            email: 'developer@example.com',
            password: await bcrypt.hash('devpass123', 10),
            name: 'Dev User',
            role: 'DEVELOPER',
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
            title: 'Software Engineer',
            description: 'We are looking for a skilled Software Engineer to join our team.',
            category: 'Technology',
            cityLocation: 'New York',
            salary: 80000,
            applicationDeadline: new Date('2024-12-31'),
            adminId: admin?.id || 1,
            published: true,
            tags: {
                create: [{ name: 'JavaScript' }, { name: 'React' }, { name: 'Node.js' }],
            },
        },
    });

    const job2 = await prisma.jobPost.create({
        data: {
            title: 'Data Scientist',
            description: 'Analyze and interpret complex data to help our business grow.',
            category: 'Technology',
            cityLocation: 'San Francisco',
            salary: 90000,
            applicationDeadline: new Date('2024-12-31'),
            adminId: admin?.id || 1,
            tags: {
                create: [{ name: 'Python' }, { name: 'Machine Learning' }, { name: 'Data Analysis' }],
            },
        },
    });

    await prisma.jobPost.create({
        data: {
            title: 'Mining Construction Supervisor',
            description: 'We are seeking an experienced Construction Supervisor in the mining sector.',
            category: 'Construction',
            cityLocation: 'Balikpapan',
            salary: 90000000,
            applicationDeadline: new Date('2024-11-30'),
            adminId: admin?.id || 1,
            tags: {
                create: [{ name: 'Construction' }, { name: 'Mining' }, { name: 'Safety' }],
            },
        },
    });
    await prisma.jobPost.create({
        data: {
            title: 'Backend Developer',
            description: 'We are looking for a Backend Developer with Node.js expertise.',
            category: 'Technology',
            cityLocation: 'Chicago',
            salary: 8500000,
            applicationDeadline: new Date('2024-10-31'),
            adminId: admin?.id || 1,
            tags: {
                create: [{ name: 'Node.js' }, { name: 'Express' }, { name: 'MongoDB' }],
            },
        },
    });
    await prisma.jobPost.create({
        data: {
            title: 'Product Manager',
            description: 'Join us as a Product Manager to lead our development team.',
            category: 'Others',
            cityLocation: 'Boston',
            salary: 9500000,
            applicationDeadline: new Date('2024-12-15'),
            adminId: admin?.id || 1,
            tags: {
                create: [{ name: 'Leadership' }, { name: 'Strategy' }],
            },
        },
    });
    await prisma.jobPost.create({
        data: {
            title: 'Internship DevOps Engineer',
            description: 'We are seeking an Freshgraduate DevOps Engineer.',
            category: 'Technology',
            cityLocation: 'Austin',
            applicationDeadline: new Date('2024-12-01'),
            adminId: admin?.id || 1,
            tags: {
                create: [{ name: 'AWS' }, { name: 'Docker' }, { name: 'Kubernetes' }],
            },
        },
    });

    // Create skill assessments and questions
    const skillAssessment = await prisma.skillAssessment.create({
        data: {
            skillName: 'JavaScript Proficiency',
            questions: {
                create: [
                    { content: 'What is a closure in JavaScript?' },
                    {
                        content: 'Explain the difference between var, let, and const.',
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
            subscriptionType: 'STANDARD',
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
            badgeName: 'JavaScript Mastery',
        },
    });

    // Create a job application for the user
    await prisma.jobApplication.create({
        data: {
            jobId: job1.id,
            userId: user1.id,
            status: 'PENDING',
            cvUrl: 'https://example.com/cv/user1.pdf',
            expectedSalary: 85000,
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
            status: 'SUBMITTED',
        },
    });

    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
