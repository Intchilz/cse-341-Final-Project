const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/administration');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createAdmin);

router.put('/:id', contactsController.updateAdmin);

router.delete('/:id', contactsController.deleteAdmin);

module.exports = router;

