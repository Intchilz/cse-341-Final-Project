const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/teachers');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createTeacher);

router.put('/:id', contactsController.updateTeacher);

router.delete('/:id', contactsController.deleteTeacher);

module.exports = router;

