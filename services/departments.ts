import db from "../models"
import { DepartmentAttributes } from "../types/departments"


export const createDepartmentService = async (data: DepartmentAttributes) => {
    const department = await db.Department.create(data)
    return department
}

export const getDepartmentsService = async () => {
    const departments = await db.Department.findAll({})
    return departments
}