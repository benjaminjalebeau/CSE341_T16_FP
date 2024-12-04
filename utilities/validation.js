const { body, validationResult } = require("express-validator");
const ObjectId = require('mongodb').ObjectId;

/*  **********************************
*  Validation Rules
* ********************************* */




/*  **********************************
*  General Validation Function
* ********************************* */
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

//Dont forget to add the validation rules you add here.
module.exports = { 
  validate
 }