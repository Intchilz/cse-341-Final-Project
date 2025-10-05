const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const { teacherValidationRules, validate } = require('../middleware/validation');


const getAll = async (req, res, next) => {
  //#swagger.tags = ['Teachers']
  try {
    const result = await mongodb.getDatabase().db('primaryschool').collection('teachers').find();
    const teachers = await result.toArray();
    res.status(200).json(teachers);
  } catch (error) {
    next(error); // Passes the error to the global handler
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags = ['Teacher']
  try {
    const teacherId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('primaryschool').collection('teachers').find({ _id: teacherId });
    const teacher = await result.toArray();

    if (!teacher || teacher.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json(teacher[0]);
  } catch (error) {
    next(error);
  }
};

const createTeacher = async (req, res, next) => {
  //#swagger.tags = ['Teacher']
  try {
    const teacher = {
      name: req.body.name,
      contact: req.body.contact,
      subject: req.body.subject,
      class: req.body.class,
    };

    const response = await mongodb.getDatabase().db('primaryschool').collection('teachers').insertOne(teacher);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Teacher created successfully', id: response.insertedId });
    } else {
      throw new Error('Failed to create teacher');
    }
  } catch (error) {
    next(error);
  }
};

const updateTeacher = async (req, res, next) => {
  //#swagger.tags = ['Teacher']
  try {
    const teacherId = new ObjectId(req.params.id);
    const teacher = {
      name: req.body.name,
      contact: req.body.contact,
      subject: req.body.subject,
      class: req.body.class,
    };

    const response = await mongodb.getDatabase().db('primaryschool').collection('teachers').replaceOne({ _id: teacherId }, teacher);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Teacher updated successfully' });
    } else {
      res.status(404).json({ message: 'Teacher not found or no changes made' });
    }
  } catch (error) {
    next(error);
  }
};

const deleteTeacher = async (req, res, next) => {
  //#swagger.tags = ['Teacher']
  try {
    const teacherId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('primaryschool').collection('teachers').deleteOne({ _id: teacherId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
