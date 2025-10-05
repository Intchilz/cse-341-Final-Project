const express = require('express');
const router = express.Router();

const adminController = require('../controllers/administration');
const { adminValidationRules, validate } = require('../middleware/validation');

router.get('/', adminController.getAll);

router.get('/:id', adminController.getSingle);

router.post('/', adminValidationRules(), validate, adminController.createAdmin);
router.put('/:id', adminValidationRules(), validate, adminController.updateAdmin);
router.delete('/:id', adminValidationRules(), validate, adminController.deleteAdmin);

module.exports = router;

