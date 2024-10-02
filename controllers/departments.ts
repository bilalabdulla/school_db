import { NextFunction, Request, Response } from "express";
import { createDepartmentService, getDepartmentsService } from "../services/departments";
import { StatusCodes } from "http-status-codes";

export const createDepartments = async (req: Request, res: Response, next: NextFunction) => {
    const department = await createDepartmentService(req.body)
    res.status(StatusCodes.CREATED).json(department)
}

export const getDepartments = async (req: Request, res: Response, next: NextFunction) => {
    const departments = await getDepartmentsService()
    res.status(StatusCodes.OK).json(departments)
}