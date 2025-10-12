const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teachers');
const { teacherValidationRules, validate } = require('../middleware/validation');
const ensureAuthenticated = require('../middleware/authenticate');

router.get('/', teacherController.getAll);

router.get('/:id', teacherController.getSingle);

router.post('/', ensureAuthenticated, teacherValidationRules(), validate, teacherController.createTeacher);
router.put('/:id', ensureAuthenticated, teacherValidationRules(), validate, teacherController.updateTeacher);
router.delete('/:id', ensureAuthenticated, teacherController.deleteTeacher);


module.exports = router;

