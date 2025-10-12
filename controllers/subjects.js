const { create } = require('domain');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const { adminValidationRules, validate } = require('../middleware/validation');


const getAll = async (req, res, next) => {
  //#swagger.tags = ['Subjects']
  try {
    const result = await mongodb.getDatabase().db('primaryschool').collection('subjects').find();
    result.toArray()
      .then((subject) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(subject);
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags = ['Subjects']
  try {
    const subjectId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('primaryschool').collection('subjects').find({ _id: subjectId });
    result.toArray()
      .then((subject) => {
        if (!subject[0]) {
          const err = new Error('Subject not found');
          err.status = 404;
          return next(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(subject[0]);
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

const createSubject = async (req, res, next) => {
  //#swagger.tags = ['Subjects']
  try {
    const subject = {
      name: req.body.name,
    };
    const response = await mongodb.getDatabase().db('primaryschool').collection('subjects').insertOne(subject);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      const err = new Error('Some error occurred while adding subject.');
      err.status = 500;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

const updateSubject = async (req, res, next) => {
  //#swagger.tags = ['Subjects']
  try {
    const subjectId = new ObjectId(req.params.id);
    const subject = {
      name: req.body.name,
    };
    const response = await mongodb.getDatabase().db('primaryschool').collection('subjects').replaceOne({ _id: subjectId }, subject);
    if (response.modifiedCount > 0) {
      res.status(201).json(response);
    } else {
      const err = new Error('Some error occurred while updating subject details.');
      err.status = 500;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

const deleteSubject = async (req, res, next) => {
  //#swagger.tags = ['Subjects']
  try {
    const subjectId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('primaryschool').collection('subjects').deleteOne({ _id: subjectId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const err = new Error('Some error occurred while deleting subject.');
      err.status = 500;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createSubject,
  updateSubject,
  deleteSubject,
};
