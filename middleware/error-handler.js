const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'something went wrong try again later'
  }
 // if (err instanceof CustomAPIError) {
   // return res.status(err.statusCode).json({ msg: err.message })
  //if (err.name === validationError){
    //console.log(Object.values(err.errors))
//customError.msg = Object.values(err.errors).map((item) => item.message). join(',')
//customError.msg.statusCode = 400
  //}
  if (err.name === 'CastError'){
    customError.msg = `no item found with id: ${err.value}`
    customError.statusCode = 404
  }
  if (err.code && err.code === 11000){
    costumError.msg = `duplicate value entered for ${Object.keys(err.keyValue)} field,please choose another value`
    customError.statusCode = 400
  }
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
