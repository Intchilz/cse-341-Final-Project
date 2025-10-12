const express = require('express');
const router = express.Router();

const subjectController = require('../controllers/subjects');
const { subjectValidationRules, validate } = require('../middleware/validation');
const ensureAuthenticated = require('../middleware/authenticate');

router.get('/', subjectController.getAll);

router.get('/:id', subjectController.getSingle);

router.post('/', ensureAuthenticated, subjectValidationRules(), validate, subjectController.createSubject);
router.put('/:id', ensureAuthenticated, subjectValidationRules(), validate, subjectController.updateSubject);
router.delete('/:id',ensureAuthenticated, subjectController.deleteSubject);


module.exports = router;

