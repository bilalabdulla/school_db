import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong'
    }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item: any) => {
            return item.message
        }).join(', ')
        customError.statusCode = 400
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field`
        customError.statusCode = 400
    }

    if (err.name === 'CastError') {
        customError.msg = `No item found with id ${err.value}`
    }

    return res.status(customError.statusCode).json({Message: customError.msg})
}

export default errorHandlerMiddleware
