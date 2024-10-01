import db from "../models"
import { SubjectAttributes } from "../types/subject"


export const createSubjectsService = async (data: SubjectAttributes) => {
    try {
        const subject = await db.Subject.create(data)
        return subject
    } catch (error) {
        return error
    }
}

export const getSubjectService = async (id: number) => {
    try {
        const subject = await db.Subject.findOne({
            where: {id}
        })
        return subject
    } catch (error) {
        return error
    }
}

export const getSubjectsService = async () => {
    try {
        const subjects = await db.Subject.findAll({
            order: ['id']
        })
        return subjects
    } catch (error) {
        return error
    }
}

export const updateSubjectsService = async (id: number, data: SubjectAttributes) => {
    try {
        const subject = await db.Subject.update(data, {
            where: {id}
        })
        return subject
    } catch (error) {
        return error 
    }
}

export const deleteSubjectService = async (id: number) => {
    try {
        const subject = await db.Subject.findOne({
            where: {id}
        })

        await subject.destroy()

        return "deleted subject"
    } catch (error) {
        return error
    }
}