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
                    companyName: 'Astra Group Indonesia',
                    companyDescription: 'Astra International is an Indonesian conglomerate. It is engaged in the automotive, agribusiness, heavy equipment, mining, energy, financial services, information technology, and infrastructure and logistics sectors.',
                    companyBannerImg: 'https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155298/astra_ozapdd.png',
                    companyCityLocation: 'Kota Semarang',
                    companyProvince: 'Jawa Tengah',
                    phoneNumber: '+123456789',
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
                    companyName: 'Amazon Web Service Indonesia',
                    companyDescription: "Amazon Web Services (AWS) is a subsidiary of Amazon providing on-demand cloud computing platforms and APIs to individuals, companies, and governments, on a metered pay-as-you-go basis. These cloud computing web services provide a variety of basic abstract technical infrastructure and distributed computing building blocks and tools.",
                    companyBannerImg: 'https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155298/aws_publ0g.png',
                    companyCityLocation: 'Kota Semarang',
                    companyProvince: 'Jawa Tengah',
                    phoneNumber: '+123456789',
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
                    companyName: 'Dell Technologies Indonesia',
                    companyDescription: 'Dell Technologies is an American multinational technology company. It was formed as a result of the acquisition of EMC Corporation by Dell Inc.',
                    companyBannerImg: 'https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155299/dell_kv8wre.png',
                    companyCityLocation: 'Kota Semarang',
                    companyProvince: 'Jawa Tengah',
                    phoneNumber: '+123456789',
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
                    companyName: 'Google Indonesia',
                    companyDescription: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.',
                    companyBannerImg: 'https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155299/google_xmcbav.png',
                    companyCityLocation: 'Kota Jakarta',
                    companyProvince: 'Jakarta',
                    phoneNumber: '+123456789',
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
                    companyName: 'Ultra Sakti Indonesia',
                    companyDescription: 'Ultra Sakti is a technology company that provides a variety of services, including software development, IT consulting, and digital marketing.',
                    companyBannerImg: 'https://res.cloudinary.com/dkcur9nvf/image/upload/v1729155300/ultrasakti_hbhs1i.png',
                    companyCityLocation: 'Kota Surabaya',
                    companyProvince: 'Jawa Timur',
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

    // Create a skill assessment quiz
    const skillAssessmentQuizJavascript = await prisma.skillAssessment.create({
        data: {
            skillName: 'JavaScript',
            description: 'Test your knowledge of JavaScript with this quiz.',
            questions: {
                create: [
                    {
                        questionText: 'What is the result of 2 + 2?',
                        choices: {
                            create: [
                                { text: '3' },
                                { text: '4' },
                                { text: '5' },
                                { text: '6' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is '4'
                    },
                    {
                        questionText: 'Which of the following is a primitive type in JavaScript?',
                        choices: {
                            create: [
                                { text: 'Array' },
                                { text: 'String' },
                                { text: 'Object' },
                                { text: 'Function' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is 'String'
                    },
                    {
                        questionText: 'Which method is used to convert a JSON object to a string?',
                        choices: {
                            create: [
                                { text: 'JSON.stringify()' },
                                { text: 'JSON.parse()' },
                                { text: 'toString()' },
                                { text: 'JSON.convert()' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'JSON.stringify()'
                    },
                    {
                        questionText: 'What is the output of `typeof null`?',
                        choices: {
                            create: [
                                { text: 'null' },
                                { text: 'undefined' },
                                { text: 'object' },
                                { text: 'function' },
                            ],
                        },
                        correctAnswerId: 3, // Correct answer is 'object'
                    },
                    {
                        questionText: 'Which of these keywords is used to declare a variable?',
                        choices: {
                            create: [
                                { text: 'var' },
                                { text: 'let' },
                                { text: 'const' },
                                { text: 'All of the above' },
                            ],
                        },
                        correctAnswerId: 4, // Correct answer is 'All of the above'
                    },
                    {
                        questionText: 'Which of the following is NOT a valid JavaScript loop?',
                        choices: {
                            create: [
                                { text: 'for' },
                                { text: 'while' },
                                { text: 'foreach' },
                                { text: 'do-while' },
                            ],
                        },
                        correctAnswerId: 3, // Correct answer is 'foreach'
                    },
                    {
                        questionText: 'What does `NaN` stand for?',
                        choices: {
                            create: [
                                { text: 'Not a Number' },
                                { text: 'Null and Number' },
                                { text: 'Negative and Null' },
                                { text: 'None' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'Not a Number'
                    },
                    {
                        questionText: 'How do you write a comment in JavaScript?',
                        choices: {
                            create: [
                                { text: '// This is a comment' },
                                { text: '<!-- This is a comment -->' },
                                { text: '/* This is a comment */' },
                                { text: '# This is a comment' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is '// This is a comment'
                    },
                    {
                        questionText: 'Which method is used to add an element to the end of an array?',
                        choices: {
                            create: [
                                { text: 'push()' },
                                { text: 'pop()' },
                                { text: 'shift()' },
                                { text: 'unshift()' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'push()'
                    },
                    {
                        questionText: 'How do you declare an arrow function in JavaScript?',
                        choices: {
                            create: [
                                { text: 'function => () {}' },
                                { text: '() => {}' },
                                { text: 'function() => {}' },
                                { text: '=> function()' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is '() => {}'
                    },
                    {
                        questionText: 'What is the default value of an uninitialized variable in JavaScript?',
                        choices: {
                            create: [
                                { text: 'null' },
                                { text: 'undefined' },
                                { text: '0' },
                                { text: 'false' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is 'undefined'
                    },
                    {
                        questionText: 'What does `===` mean in JavaScript?',
                        choices: {
                            create: [
                                { text: 'Equal value' },
                                { text: 'Equal value and type' },
                                { text: 'Equal reference' },
                                { text: 'Strict inequality' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is 'Equal value and type'
                    },
                    {
                        questionText: 'Which function is used to parse a string to an integer in JavaScript?',
                        choices: {
                            create: [
                                { text: 'parseInt()' },
                                { text: 'parseFloat()' },
                                { text: 'Number()' },
                                { text: 'int()' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'parseInt()'
                    },
                    {
                        questionText: 'Which statement is used to stop a loop in JavaScript?',
                        choices: {
                            create: [
                                { text: 'exit' },
                                { text: 'break' },
                                { text: 'continue' },
                                { text: 'return' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is 'break'
                    },
                    {
                        questionText: 'Which method is used to remove the last element from an array?',
                        choices: {
                            create: [
                                { text: 'pop()' },
                                { text: 'push()' },
                                { text: 'shift()' },
                                { text: 'slice()' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'pop()'
                    },
                    {
                        questionText: 'Which keyword is used to define a constant variable?',
                        choices: {
                            create: [
                                { text: 'let' },
                                { text: 'var' },
                                { text: 'const' },
                                { text: 'static' },
                            ],
                        },
                        correctAnswerId: 3, // Correct answer is 'const'
                    },
                    {
                        questionText: 'What is the output of `Boolean("")` in JavaScript?',
                        choices: {
                            create: [
                                { text: 'true' },
                                { text: 'false' },
                                { text: 'undefined' },
                                { text: 'null' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is 'false'
                    },
                    {
                        questionText: 'Which of the following is NOT a falsy value in JavaScript?',
                        choices: {
                            create: [
                                { text: 'null' },
                                { text: '0' },
                                { text: '"false"' },
                                { text: 'undefined' },
                            ],
                        },
                        correctAnswerId: 3, // Correct answer is '"false"'
                    },
                    {
                        questionText: 'How do you create a new object in JavaScript?',
                        choices: {
                            create: [
                                { text: 'new Object()' },
                                { text: 'Object.create()' },
                                { text: '{} (Object literal)' },
                                { text: 'All of the above' },
                            ],
                        },
                        correctAnswerId: 4, // Correct answer is 'All of the above'
                    },
                    {
                        questionText: 'What is the value of `undefined == null` in JavaScript?',
                        choices: {
                            create: [
                                { text: 'true' },
                                { text: 'false' },
                                { text: 'undefined' },
                                { text: 'null' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'true'
                    },
                    {
                        questionText: 'How can you add a new property to an object in JavaScript?',
                        choices: {
                            create: [
                                { text: 'obj.property = value' },
                                { text: 'obj["property"] = value' },
                                { text: 'Object.defineProperty()' },
                                { text: 'All of the above' },
                            ],
                        },
                        correctAnswerId: 4, // Correct answer is 'All of the above'
                    },
                    {
                        questionText: 'Which operator is used to check both value and type equality in JavaScript?',
                        choices: {
                            create: [
                                { text: '==' },
                                { text: '===' },
                                { text: '!=' },
                                { text: '!==' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is '==='
                    },
                    {
                        questionText: 'What is the output of `[1, 2, 3].map(x => x * 2)`?',
                        choices: {
                            create: [
                                { text: '[1, 4, 6]' },
                                { text: '[2, 4, 6]' },
                                { text: '[2, 8, 18]' },
                                { text: '[1, 2, 3]' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is '[2, 4, 6]'
                    },
                    {
                        questionText: 'How do you convert a string to a number in JavaScript?',
                        choices: {
                            create: [
                                { text: 'Number()' },
                                { text: 'parseFloat()' },
                                { text: 'parseInt()' },
                                { text: 'All of the above' },
                            ],
                        },
                        correctAnswerId: 4, // Correct answer is 'All of the above'
                    },
                    {
                        questionText: 'What is the output of `5 + "5"` in JavaScript?',
                        choices: {
                            create: [
                                { text: '10' },
                                { text: '55' },
                                { text: '5' },
                                { text: 'Error' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is '10'
                    },
                ],
            },
            developerId: 1,
        },
    });

    // Create a skill assessment quiz for Python
        const skillAssessmentQuizPython = await prisma.skillAssessment.create({
        data: {
            skillName: 'Python',
            description: 'Test your knowledge of Python with this quiz.',
            questions: {
                create: [
                    {
                        questionText: 'What is the result of 2 + 2?',
                        choices: {
                            create: [
                                { text: '3' },
                                { text: '4' },
                                { text: '5' },
                                { text: '6' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is '4'
                    },
                    {
                        questionText: 'Which of the following is a valid variable name in Python?',
                        choices: {
                            create: [
                                { text: 'my-variable' },
                                { text: 'my_variable' },
                                { text: 'my variable' },
                                { text: 'myVariable' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is 'my_variable'
                    },
                    {
                        questionText: 'Which keyword is used to define a function in Python?',
                        choices: {
                            create: [
                                { text: 'function' },
                                { text: 'def' },
                                { text: 'define' },
                                { text: 'func' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is 'def'
                    },
                    {
                        questionText: 'What is the output of `len([1, 2, 3])`?',
                        choices: {
                            create: [
                                { text: '3' },
                                { text: '6' },
                                { text: '0' },
                                { text: '1' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is '3'
                    },
                    {
                        questionText: 'Which method is used to add an element to the end of a list in Python?',
                        choices: {
                            create: [
                                { text: 'append()' },
                                { text: 'add()' },
                                { text: 'push()' },
                                { text: 'insert()' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'append()'
                    },
                    {
                        questionText: 'What is the output of `2 ** 3`?',
                        choices: {
                            create: [
                                { text: '5' },
                                { text: '6' },
                                { text: '8' },
                                { text: '16' },
                            ],
                        },
                        correctAnswerId: 4, // Correct answer is '16'
                    },
                    {
                        questionText: 'Which of the following is NOT a valid data type in Python?',
                        choices: {
                            create: [
                                { text: 'int' },
                                { text: 'float' },
                                { text: 'char' },
                                { text: 'str' },
                            ],
                        },
                        correctAnswerId: 3, // Correct answer is 'char'
                    },
                    {
                        questionText: 'What is the output of `bool("False")`?',
                        choices: {
                            create: [
                                { text: 'True' },
                                { text: 'False' },
                                { text: 'None' },
                                { text: 'Error' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'True'
                    },
                    {
                        questionText: 'Which keyword is used to define a class in Python?',
                        choices: {
                            create: [
                                { text: 'class' },
                                { text: 'define' },
                                { text: 'def' },
                                { text: 'cls' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'class'
                    },
                    {
                        questionText: 'What is the output of `list(range(3))`?',
                        choices: {
                            create: [
                                { text: '[1, 2, 3]' },
                                { text: '[0, 1, 2]' },
                                { text: '[0, 1, 2, 3]' },
                                { text: '[1, 2]' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is '[0, 1, 2]'
                    },
                    {
                        questionText: 'Which method is used to remove an element from a list in Python?',
                        choices: {
                            create: [
                                { text: 'remove()' },
                                { text: 'delete()' },
                                { text: 'pop()' },
                                { text: 'discard()' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'remove()'
                    },
                    {
                        questionText: 'What is the output of `5 // 2`?',
                        choices: {
                            create: [
                                { text: '2.5' },
                                { text: '2' },
                                { text: '3' },
                                { text: '2.0' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is '2'
                    },
                    {
                        questionText: 'Which of the following is NOT a valid comparison operator in Python?',
                        choices: {
                            create: [
                                { text: '==' },
                                { text: '!=' },
                                { text: '<>' },
                                { text: '<=' },
                            ],
                        },
                        correctAnswerId: 3, // Correct answer is '<>'
                    },
                    {
                        questionText: 'What is the output of `list("hello")`?',
                        choices: {
                            create: [
                                { text: '["h", "e", "l", "l", "o"]' },
                                { text: '["hello"]' },
                                { text: '["h", "e", "l", "l", "l"]' },
                                { text: '["h", "e", "l", "o"]' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is '["h", "e", "l", "l", "o"]'
                    },
                    {
                        questionText: 'What is the output of `5 in [1, 2, 3, 4, 5]`?',
                        choices: {
                            create: [
                                { text: 'True' },
                                { text: 'False' },
                                { text: 'None' },
                                { text: 'Error' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'True'
                    },
                    {
                        questionText: 'Which method is used to convert a string to uppercase in Python?',
                        choices: {
                            create: [
                                { text: 'toUpper()' },
                                { text: 'upper()' },
                                { text: 'toUpperCase()' },
                                { text: 'capitalize()' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is 'upper()'
                    },
                    {
                        questionText: 'What is the output of `5 == "5"`?',
                        choices: {
                            create: [
                                { text: 'True' },
                                { text: 'False' },
                                { text: 'None' },
                                { text: 'Error' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is 'False'
                    },
                    {
                        questionText: 'Which method is used to convert a string to lowercase in Python?',
                        choices: {
                            create: [
                                { text: 'toLower()' },
                                { text: 'lower()' },
                                { text: 'toLowerCase()' },
                                { text: 'capitalize()' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is 'lower()'
                    },
                    {
                        questionText: 'What is the output of `5 + "5"`?',
                        choices: {
                            create: [
                                { text: '10' },
                                { text: '55' },
                                { text: '5' },
                                { text: 'Error' },
                            ],
                        },
                        correctAnswerId: 3, // Correct answer is '5'
                    },
                    {
                        questionText: 'Which method is used to sort a list in Python?',
                        choices: {
                            create: [
                                { text: 'sort()' },
                                { text: 'sorted()' },
                                { text: 'order()' },
                                { text: 'arrange()' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'sort()'
                    },
                    {
                        questionText: 'What is the output of `5 * 3`?',
                        choices: {
                            create: [
                                { text: '8' },
                                { text: '15' },
                                { text: '53' },
                                { text: '35' },
                            ],
                        },
                        correctAnswerId: 2, // Correct answer is '15'
                    },
                    {
                        questionText: 'Which method is used to reverse a list in Python?',
                        choices: {
                            create: [
                                { text: 'reverse()' },
                                { text: 'reversed()' },
                                { text: 'flip()' },
                                { text: 'backwards()' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'reverse()'
                    },
                    {
                        questionText: 'What is the output of `5 % 2`?',
                        choices: {
                            create: [
                                { text: '2' },
                                { text: '3' },
                                { text: '1' },
                                { text: '0' },
                            ],
                        },
                        correctAnswerId: 3, // Correct answer is '1'
                    },
                    {
                        questionText: 'Which method is used to find the length of a list in Python?',
                        choices: {
                            create: [
                                { text: 'size()' },
                                { text: 'length()' },
                                { text: 'len()' },
                                { text: 'count()' },
                            ],
                        },
                        correctAnswerId: 3, // Correct answer is 'len()'
                    },
                    {
                        questionText: 'What is the output of `5 > 3`?',
                        choices: {
                            create: [
                                { text: 'True' },
                                { text: 'False' },
                                { text: 'None' },
                                { text: 'Error' },
                            ],
                        },
                        correctAnswerId: 1, // Correct answer is 'True'
                    },
                ],
            },
            developerId: 1,
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
