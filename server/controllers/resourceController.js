const { CourseStructure, Resource } = require('../utils/jsonDB');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
exports.getDepartments = async (req, res) => {
    try {
        const departments = await CourseStructure.find({}, 'department slug');
        res.json(departments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get full course structure for a department (semesters, subjects)
// @route   GET /api/departments/:slug
// @access  Public
exports.getDepartmentStructure = async (req, res) => {
    try {
        const structure = await CourseStructure.findOne({ slug: req.params.slug });
        if (!structure) {
            return res.status(404).json({ msg: 'Department not found' });
        }
        res.json(structure);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get resources based on filters
// @route   GET /api/resources
// @access  Public
exports.getResources = async (req, res) => {
    const { departmentId, semesterId, subjectId, chapterId } = req.query;

    // Build query object
    let query = {};
    if (departmentId) query.departmentId = departmentId;
    if (semesterId) query.semesterId = semesterId;
    if (subjectId) query.subjectId = subjectId;
    if (chapterId) query.chapterId = chapterId;

    try {
        const resources = await Resource.find(query).sort({ createdAt: -1 });
        res.json(resources);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
