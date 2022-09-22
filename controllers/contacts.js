const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const data = await mongodb.getDatabase().db().collection('contacts').find();
  data.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const data = await mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .find({ _id: contactId });
 data.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occured while creating contact.');
  }
  
};

const updateContact = async (req, res) => {
  const ID = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .replaceOne({ _id: ID }, contact);
  console.log(response);
  response.modifiedCount > 0 ? res.status(204).send(): res.status(500).json(response.error || 'Error occurred while updating the contact.');
  
};

const deleteContact = async (req, res) => {
  const ID = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: ID }, true);
  console.log(response);
 response.deletedCount > 0 ? res.status(204).send(): res.status(500).json(response.error || 'Error occurred while deleting the contact.');
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  deleteContact,
  updateContact
};