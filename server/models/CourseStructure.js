
const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String },
    chapters: [ChapterSchema]
});

const SemesterSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    subjects: [SubjectSchema]
});

const CourseStructureSchema = new mongoose.Schema({
    department: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true }, // e.g., 'cyber-security'
    semesters: [SemesterSchema]
});

module.exports = mongoose.model('CourseStructure', CourseStructureSchema);
