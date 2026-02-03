
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['note', 'flashcard', 'paper'], required: true },
    url: { type: String, required: true },

    // Linking metadata
    departmentId: { type: String, required: true }, // slug
    semesterId: { type: Number, required: true },
    subjectId: { type: String, required: true }, // maybe subject code or name? let's use name for simplicity or code
    chapterId: { type: String }, // chapter name

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);
