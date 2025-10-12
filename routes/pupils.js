const express = require('express');
const router = express.Router();

const pupilController = require('../controllers/pupils');
const { pupilValidationRules, validate } = require('../middleware/validation');
const ensureAuthenticated = require('../middleware/authenticate');

router.get('/', pupilController.getAll);
router.get('/:id', pupilController.getSingle);

// ✅ Secure POST,PUT and DELETE with GitHub OAuth
router.post('/', ensureAuthenticated, pupilValidationRules(), validate, pupilController.createPupil);
router.put('/:id', ensureAuthenticated, pupilValidationRules(), validate, pupilController.updatePupil);

router.delete('/:id', ensureAuthenticated, pupilController.deletePupil);

module.exports = router;
