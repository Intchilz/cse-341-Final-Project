const { create } = require('domain');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const { adminValidationRules, validate } = require('../middleware/validation');


const getAll = async (req, res, next) => {
  //#swagger.tags = ['Pupils']
  try {
    const result = await mongodb.getDatabase().db('primaryschool').collection('pupils').find();
    result.toArray()
      .then((pupils) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pupils);
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags = ['Pupils']
  try {
    const pupilId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('primaryschool').collection('pupils').find({ _id: pupilId });
    result.toArray()
      .then((pupil) => {
        if (!pupil[0]) {
          const err = new Error('Pupil not found');
          err.status = 404;
          return next(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pupil[0]);
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

const createPupil = async (req, res, next) => {
  //#swagger.tags = ['Pupils']
  try {
    const pupil = {
      firstName: req.body.fName,
      LastName: req.body.lName,
      Birthdate: req.body.Birthdate,
      parentContact: req.body.parentContact,
      Grade: req.body.grade,
      teacher: req.body.teacher,
      Guardian: req.body.Guardian,
    };
    const response = await mongodb.getDatabase().db('primaryschool').collection('pupils').insertOne(pupil);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      const err = new Error('Some error occurred while creating pupil.');
      err.status = 500;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

const updatePupil = async (req, res, next) => {
  //#swagger.tags = ['Pupils']
  try {
    const pupilId = new ObjectId(req.params.id);
    const pupil = {
      firstName: req.body.fName,
      LastName: req.body.lName,
      Birthdate: req.body.Birthdate,
      parentContact: req.body.parentContact,
      Grade: req.body.grade,
      teacher: req.body.teacher,
      Guardian: req.body.Guardian,
    };
    const response = await mongodb.getDatabase().db('primaryschool').collection('pupils').replaceOne({ _id: pupilId }, pupil);
    if (response.modifiedCount > 0) {
      res.status(201).json(response);
    } else {
      const err = new Error('Some error occurred while updating pupil details.');
      err.status = 500;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

const deletePupil = async (req, res, next) => {
  //#swagger.tags = ['Pupils']
  try {
    const pupilId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('primaryschool').collection('pupils').deleteOne({ _id: pupilId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const err = new Error('Some error occurred while deleting pupil.');
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
  createPupil,
  updatePupil,
  deletePupil,
};
