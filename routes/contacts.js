const express = require('express');
const router = express.Router();

const contacts_Controller = require('../controllers/contacts');

router.get('/:id', contacts_Controller.getSingle);
router.get('/', contacts_Controller.getAll);
router.post('/', contacts_Controller.createContact);
router.put('/:id', contacts_Controller.updateContact);
router.delete('/:id', contacts_Controller.deleteContact);

module.exports = router;