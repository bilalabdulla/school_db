import db from "../models"
import { TeacherAttributes } from "../types/teacher"

export const createTeachersService = async (data: TeacherAttributes) => {
    try {
        const teacher = await db.Teacher.create(data)
        return teacher
    } catch (error) {
        return error 
    }
}

export const getTeacherService = async (id: number) => {
    try {
        const teacher = await db.Teacher.findOne({
            where: {id}
        }) 
        return teacher
    } catch (error) {
        return error 
    }
}

export const getTeachersService = async () => {
    try {
        const teachers = await db.Teacher.findAll({
            order: ['id']
        })
        return teachers
    } catch (error) {
        return error
    }
}

export const updateTeacherService = async (id: number, data: TeacherAttributes) => {
    try {
        const teacher = await db.Teacher.update(data, {
            where: {id}
        })
        return teacher
    } catch (error) {
        return error
    }
}

export const deleteTeacherService = async (id: number) => {
    try {
        const teacher = await db.Teacher.findOne({
            where: {id}
        })

        await teacher.destroy()

        return "deleted teacher"
    } catch (error) {
        return error 
    }
}