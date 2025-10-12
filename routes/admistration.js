const express = require('express');
const router = express.Router();

const adminController = require('../controllers/administration');
const { adminValidationRules, validate } = require('../middleware/validation');
const ensureAuthenticated = require('../middleware/authenticate');

router.get('/', adminController.getAll);
router.get('/:id', adminController.getSingle);

// ✅ Secure POST & PUT with GitHub OAuth
router.post('/', ensureAuthenticated, adminValidationRules(), validate, adminController.createAdmin);
router.put('/:id', ensureAuthenticated, adminValidationRules(), validate, adminController.updateAdmin);

router.delete('/:id', ensureAuthenticated, adminController.deleteAdmin);

module.exports = router;
