
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
// Use the JSON DB adapter instead of Mongoose models
const { CourseStructure, Resource } = require('./utils/jsonDB');

// Load environment variables from the same directory
dotenv.config({ path: path.join(__dirname, '.env') });
// Also try loading from current working directory if not found above
if (!process.env.MONGO_URI) dotenv.config();

const UPLOADS_DIR = path.join(__dirname, 'public/uploads/sem-2');
const SERVER_URL_BASE = '/uploads/sem-2'; // Relative URL for frontend

const scanAndSeed = async () => {
    // No database connection needed for JSON DB


    try {
        console.log('Clearing existing data...');
        // Optional: clear existing data to avoid duplicates, or check first.
        // For this task, let's clear to ensure a clean state based on the folders.
        await CourseStructure.deleteMany({});
        await Resource.deleteMany({});

        if (!fs.existsSync(UPLOADS_DIR)) {
            console.error(`Uploads directory not found: ${UPLOADS_DIR}`);
            process.exit(1);
        }

        const items = fs.readdirSync(UPLOADS_DIR, { withFileTypes: true });

        // This will hold our structure for the "Cyber Security" department, Semester 2
        const subjects = [];
        const resources = [];

        for (const item of items) {

            if (item.isDirectory()) {
                const folderName = item.name;
                // Parse folder name: "Subject_Name(CODE)" or just "Subject_Name"
                // Example: "Operating_System_and_Platform_Security(NSC)"
                let subjectName = folderName.replace(/_/g, ' ');
                let subjectCode = '';

                const codeMatch = subjectName.match(/\((.*?)\)$/);
                if (codeMatch) {
                    subjectCode = codeMatch[1];
                    subjectName = subjectName.replace(/\s*\(.*?\)$/, '').trim();
                } else {
                    // Try to generate a code if none exists
                    subjectCode = subjectName.substring(0, 3).toUpperCase();
                }

                console.log(`Found Subject: ${subjectName} (${subjectCode})`);

                // Create Subject Object for CourseStructure
                const subjectObj = {
                    name: subjectName,
                    code: subjectCode,
                    chapters: [] // We don't have chapter folders, so leave empty or add a default "General"
                };

                subjects.push(subjectObj);

                // Scan files inside the subject folder
                const subjectPath = path.join(UPLOADS_DIR, folderName);
                const files = fs.readdirSync(subjectPath);

                for (const file of files) {
                    if (file === '.' || file === '..') continue;

                    const filePath = path.join(subjectPath, file);
                    const fileStat = fs.statSync(filePath);

                    if (fileStat.isFile()) {
                        // Create Resource
                        const resource = {
                            title: file.replace(/\.[^/.]+$/, ""), // remove extension
                            type: 'note', // default to note
                            url: `${SERVER_URL_BASE}/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`,
                            departmentId: 'cyber-security',
                            semesterId: 2,
                            subjectId: subjectName, // Linking by name as per schema check
                            chapterId: 'General'
                        };
                        resources.push(resource);
                    }
                }
            } else if (item.isFile()) {
                // Files directly in sem-2 folder (like "Assignment-1.pdf")
                // Add them to a "General" or "Common" subject, or handle separately?
                // Let's create a "Common Resources" subject for these
                console.log(`Found Root File: ${item.name}`);

                // Check if we already created a 'Common' subject
                let commonSubject = subjects.find(s => s.name === 'Common Resources');
                if (!commonSubject) {
                    commonSubject = {
                        name: 'Common Resources',
                        code: 'COMMON',
                        chapters: []
                    };
                    subjects.push(commonSubject);
                }

                resources.push({
                    title: item.name.replace(/\.[^/.]+$/, ""),
                    type: 'note',
                    url: `${SERVER_URL_BASE}/${encodeURIComponent(item.name)}`,
                    departmentId: 'cyber-security',
                    semesterId: 2,
                    subjectId: 'Common Resources',
                    chapterId: 'General'
                });
            }
        }

        // Create CourseStructure
        const courseData = {
            department: 'Cyber Security',
            slug: 'cyber-security',
            semesters: [{
                number: 2,
                subjects: subjects
            }]
        };

        await CourseStructure.save(courseData);
        console.log('Course Structure Saved');

        if (resources.length > 0) {
            await Resource.insertMany(resources);
            console.log(`Saved ${resources.length} resources`);
        } else {
            console.log('No resources found to save.');
        }

        console.log('Seeding Complete');
        process.exit(0);

    } catch (error) {
        console.error('Seeding Failed:', error);
        process.exit(1);
    }
};

scanAndSeed();
