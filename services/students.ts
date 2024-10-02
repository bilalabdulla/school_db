import { StatusCodes } from "http-status-codes"
import db from "../models"
import { StudentAttributes } from "../types/student"
import { studentParams } from "../types/students.params"
import BadRequestError from "../errors/bad-request"
import NotFoundError from "../errors/not-found"


export const createStudentsService = async (data: StudentAttributes) => {
    const oldStudent = await db.Student.findOne({
        where: {firstName: data.firstName, lastName: data.lastName, grade: data.grade, enrolled_year: data.enrolled_year}
    })
    if (oldStudent) {
        throw new BadRequestError('Student Already exists')
    }

    const student = db.Student.create(data)
    return student
}              

export const getStudentService = async (id: number) => {

    const student = await db.Student.findOne({
        where: {id}
    })
    if (!student) {
        throw new NotFoundError('Student doesnt exist')
    }
    return student
}

export const getStudentsService = async () => {
    const students = await db.Student.findAll({
        order: ['id']
    })
    if (!students) {
        throw new NotFoundError('Students doesnt exist')
    } 
    return students 
}

export const updateStudentsService = async (id: number, data: StudentAttributes) => {
    const student = await db.Student.findOne({
        where: {id}
    })
    if (!student) {
        throw new NotFoundError("Student doesnt exist")
    }
    await student.update(data)

    return student
}    

export const deleteStudentService = async (id: number) => {
    const student = await db.Student.findOne({
        where: {id}
    })
    if (!student) {
        throw new NotFoundError('Student doesnt exist')
    }

    await student.destroy()    

    return "deleted student"
}