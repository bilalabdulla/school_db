import db from "../models"
import { DepartmentAttributes } from "../types/departments"


export const createDepartmentService = async (data: DepartmentAttributes) => {
    try {
        const department = await db.Department.create(data)
        return department
    } catch (error) {
        return error
    }
}

export const getDepartmentsService = async () => {
    try {
        const departments = await db.Department.findAll({})
        return departments
    } catch (error) {
        return error
    }
}