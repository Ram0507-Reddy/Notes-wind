
const express = require('express');
const router = express.Router();
const {
    getDepartments,
    getDepartmentStructure,
    getResources
} = require('../controllers/resourceController');

router.get('/departments', getDepartments);
router.get('/departments/:slug', getDepartmentStructure);
router.get('/resources', getResources);

module.exports = router;
