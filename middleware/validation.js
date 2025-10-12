
const { body, param, validationResult } = require('express-validator');

// Middleware to handle validation result
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation failed');
    err.statusCode = 422;
    err.details = errors.array();
    return next(err);
  }
  next();
};

// ---------------------------
// ✅ Validation rules for Administration
// ---------------------------
const adminValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('contact')
    .notEmpty().withMessage('Contact is required')
    .isMobilePhone().withMessage('Contact must be a valid phone number'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid'),
  body('position').notEmpty().withMessage('Position is required'),
  param('id').optional().isMongoId().withMessage('Invalid admin ID'),
];

// ---------------------------
// ✅ Validation rules for Teachers
// ---------------------------
const teacherValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('contact')
    .notEmpty().withMessage('Contact is required')
    .isMobilePhone().withMessage('Contact must be a valid phone number'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('class').notEmpty().withMessage('Class is required'),
  param('id').optional().isMongoId().withMessage('Invalid teacher ID'),
];

// ---------------------------
// ✅ Validation rules for Pupils
// ---------------------------
const pupilValidationRules = () => [
  body('fName').notEmpty().withMessage('First name is required'),
  body('lName').notEmpty().withMessage('Last name is required'),
  body('Birthdate')
    .notEmpty().withMessage('Birthdate is required')
    .isISO8601().withMessage('Format should be YYYY-MM-DD'),
  body('parentContact')
    .notEmpty().withMessage('Parent contact is required')
    .isMobilePhone().withMessage('Parent contact must be a valid phone number'),
  body('grade').notEmpty().withMessage('Grade is required'),
  body('teacher').notEmpty().withMessage('Teacher is required'),
  body('Guardian').notEmpty().withMessage('Guardian is required'),
  param('id').optional().isMongoId().withMessage('Invalid pupil ID'),
];

// ---------------------------
// ✅ Validation rules for Subjects
// ---------------------------
const subjectValidationRules = () => [
  body('name').notEmpty().withMessage('Subject name is required'),
  param('id').optional().isMongoId().withMessage('Invalid subject ID'),
];

// ---------------------------
// ✅ Exports
// ---------------------------
module.exports = {
  validate,
  adminValidationRules,
  teacherValidationRules,
  pupilValidationRules,
  subjectValidationRules,
};
