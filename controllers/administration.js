const { create } = require('domain');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  //#swagger.tags = ['Administration']
  try {
    const result = await mongodb.getDatabase().db('primaryschool').collection('administration').find();
    result.toArray()
      .then((administration) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(administration);
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags = ['Administration']
  try {
    const adminId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('primaryschool').collection('administration').find({ _id: adminId });
    result.toArray()
      .then((administration) => {
        if (!administration[0]) {
          const err = new Error('Admin not found');
          err.status = 404;
          return next(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(administration[0]);
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

const createAdmin = async (req, res, next) => {
  //#swagger.tags = ['Administration']
  try {
    const admin = {
      Name: req.body.name,
      contact: req.body.contact,
      email: req.body.email,
      position: req.body.position,
    };
    const response = await mongodb.getDatabase().db('primaryschool').collection('administration').insertOne(admin);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      const err = new Error('Some error occurred while creating admin.');
      err.status = 500;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

const updateAdmin = async (req, res, next) => {
  //#swagger.tags = ['Administration']
  try {
    const adminId = new ObjectId(req.params.id);
    const admin = {
      Name: req.body.name,
      contact: req.body.contact,
      email: req.body.email,
      position: req.body.position,
    };
    const response = await mongodb.getDatabase().db('primaryschool').collection('administration').replaceOne({ _id: adminId }, admin);
    if (response.modifiedCount > 0) {
      res.status(201).json(response);
    } else {
      const err = new Error('Some error occurred while updating admin details.');
      err.status = 500;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  //#swagger.tags = ['Administration']
  try {
    const adminId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('primaryschool').collection('administration').deleteOne({ _id: adminId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const err = new Error('Some error occurred while deleting admin.');
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
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
