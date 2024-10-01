import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";



export default class NotFoundError extends CustomAPIError {
    statusCode: any

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}