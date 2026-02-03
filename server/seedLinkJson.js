
const fs = require('fs');
const path = require('path');
const { CourseStructure, Resource } = require('./utils/jsonDB');

const UPLOADS_DIR = path.join(__dirname, 'public/uploads/sem-2');
const SERVER_URL_BASE = '/uploads/sem-2';
const DB_PATH = path.join(__dirname, 'data/db.json');

const scanAndSeed = async () => {
    try {
        console.log('Clearing existing data...');
        // We can just wipe the db.json file content
        fs.writeFileSync(DB_PATH, JSON.stringify({ courseStructure: [], resources: [] }, null, 2));

        // Or use the adapter methods if we want to be "pure"
        // await CourseStructure.deleteMany({});
        // await Resource.deleteMany({});

        if (!fs.existsSync(UPLOADS_DIR)) {
            console.error(`Uploads directory not found: ${UPLOADS_DIR}`);
            process.exit(1);
        }

        const items = fs.readdirSync(UPLOADS_DIR, { withFileTypes: true });

        const subjects = [];
        const resourcesList = [];

        for (const item of items) {
            if (item.isDirectory()) {
                const folderName = item.name;
                let subjectName = folderName.replace(/_/g, ' ');
                let subjectCode = '';

                const codeMatch = subjectName.match(/\((.*?)\)$/);
                if (codeMatch) {
                    subjectCode = codeMatch[1];
                    subjectName = subjectName.replace(/\s*\(.*?\)$/, '').trim();
                } else {
                    subjectCode = subjectName.substring(0, 3).toUpperCase();
                }

                console.log(`Found Subject: ${subjectName} (${subjectCode})`);

                subjects.push({
                    name: subjectName,
                    code: subjectCode,
                    chapters: []
                });

                const subjectPath = path.join(UPLOADS_DIR, folderName);
                const files = fs.readdirSync(subjectPath);

                for (const file of files) {
                    if (file === '.' || file === '..') continue;
                    const filePath = path.join(subjectPath, file);
                    if (fs.statSync(filePath).isFile()) {
                        resourcesList.push({
                            title: file.replace(/\.[^/.]+$/, ""),
                            type: 'note',
                            url: `${SERVER_URL_BASE}/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`,
                            departmentId: 'cyber-security',
                            semesterId: 2,
                            subjectId: subjectName,
                            chapterId: 'General',
                            createdAt: new Date().toISOString()
                        });
                    }
                }
            } else if (item.isFile()) {
                resourcesList.push({
                    title: item.name.replace(/\.[^/.]+$/, ""),
                    type: 'note',
                    url: `${SERVER_URL_BASE}/${encodeURIComponent(item.name)}`,
                    departmentId: 'cyber-security',
                    semesterId: 2,
                    subjectId: 'Common Resources',
                    chapterId: 'General',
                    createdAt: new Date().toISOString()
                });

                if (!subjects.find(s => s.name === 'Common Resources')) {
                    subjects.push({ name: 'Common Resources', code: 'COMMON', chapters: [] });
                }
            }
        }

        // Save Course Structure
        // Since our adapter mimics Mongoose, we use the internal _save method logic exposed via our "Model"
        // But our adapter's .save() expects an object to be pushed.
        // The original schema was: new CourseStructure({...}).save()
        // Our adapter exposes: CourseStructure.save(data) -> inserts into array

        const courseStructData = {
            department: 'Cyber Security',
            slug: 'cyber-security',
            semesters: [{
                number: 2,
                subjects: subjects
            }]
        };

        await CourseStructure.save(courseStructData);
        console.log('Course Structure Saved');

        if (resourcesList.length > 0) {
            await Resource.insertMany(resourcesList);
            console.log(`Saved ${resourcesList.length} resources`);
        }

        console.log('Seeding Complete');

    } catch (error) {
        console.error('Seeding Failed:', error);
        process.exit(1);
    }
};

scanAndSeed();
