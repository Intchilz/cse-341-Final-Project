const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teachers');
const { teacherValidationRules, validate } = require('../middleware/validation');

router.get('/', teacherController.getAll);

router.get('/:id', teacherController.getSingle);

router.post('/', teacherValidationRules(), validate, teacherController.createTeacher);
router.put('/:id', teacherValidationRules(), validate, teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);


module.exports = router;

