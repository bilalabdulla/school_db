import BadRequestError from "../errors/bad-request"
import NotFoundError from "../errors/not-found"
import db from "../models"
import { TeacherAttributes } from "../types/teacher"

export const createTeachersService = async (data: TeacherAttributes) => {
    const oldTeacher = await db.Teacher.findOne({
        where: { firstName: data.firstName, lastName: data.lastName }
    })
    if (oldTeacher) {
        throw new BadRequestError('Teacher already exists')
    }
    const teacher = await db.Teacher.create(data)
    return teacher
}

export const getTeacherService = async (id: number) => {
    const teacher = await db.Teacher.findOne({
        where: {id}
    }) 

    if (!teacher) {
        throw new NotFoundError('Teacher doesnt exist')
    }
    return teacher
}

export const getTeachersService = async () => {
    const teachers = await db.Teacher.findAll({
        order: ['id']
    })
    if (!teachers) {
        throw new NotFoundError('Teachers doesnt exist')
    }
    return teachers
}

export const updateTeacherService = async (id: number, data: TeacherAttributes) => {
    const teacher = await db.Teacher.findOne({
        where: {id}
    })
    
    if (!teacher) {
        throw new NotFoundError('Teacher doesnt exist')
    }

    await teacher.update(data)

    return teacher
}

export const deleteTeacherService = async (id: number) => {
    const teacher = await db.Teacher.findOne({
        where: {id}
    })

    await teacher.destroy()

    return "deleted teacher"
}