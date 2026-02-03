
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CourseStructure = require('./models/CourseStructure');
const Resource = require('./models/Resource');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/uninest');
        console.log('MongoDB Connected for Seeding');

        // Clear existing data
        await CourseStructure.deleteMany({});
        await Resource.deleteMany({});

        // Create Course Structure
        const cyberSec = new CourseStructure({
            department: 'Cyber Security',
            slug: 'cyber-security',
            semesters: [
                {
                    number: 2,
                    subjects: [
                        {
                            name: 'Operating Systems',
                            code: '203105203',
                            chapters: [{ name: 'Unit 1: Introduction' }, { name: 'Unit 2: Process Management' }]
                        },
                        {
                            name: 'Data Structures',
                            code: '203105202',
                            chapters: [{ name: 'Unit 1: Arrays' }, { name: 'Unit 2: Linked Lists' }]
                        }
                    ]
                }
            ]
        });

        await cyberSec.save();
        console.log('Course Structure Seeded');

        // Create Resources
        const resources = [
            {
                title: 'OS Unit 1 Notes',
                type: 'note',
                url: 'https://example.com/os-notes.pdf',
                departmentId: 'cyber-security',
                semesterId: 2,
                subjectId: '203105203', // using code as ID for matching
                chapterId: 'Unit 1: Introduction'
            },
            {
                title: 'OS Process Mgmt Flashcards',
                type: 'flashcard',
                url: 'https://quizlet.com/example',
                departmentId: 'cyber-security',
                semesterId: 2,
                subjectId: '203105203',
                chapterId: 'Unit 2: Process Management'
            }
        ];

        await Resource.insertMany(resources);
        console.log('Resources Seeded');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
