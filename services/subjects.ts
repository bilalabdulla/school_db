import BadRequestError from "../errors/bad-request"
import NotFoundError from "../errors/not-found"
import db from "../models"
import { SubjectAttributes } from "../types/subject"


export const createSubjectsService = async (data: SubjectAttributes) => {
    const oldSubject = await db.Subject.findOne({
        where: {grade: data.grade, title: data.title}
    })
    if (oldSubject) {
        throw new BadRequestError('Subject already exists')
    }
    const subject = await db.Subject.create(data)
    return subject
}

export const getSubjectService = async (id: number) => {
    const subject = await db.Subject.findOne({
        where: {id}
    })
    if (!subject) {
        throw new NotFoundError('Subject doesnt exists')
    }
    return subject
}

export const getSubjectsService = async () => {
    const subjects = await db.Subject.findAll({
        order: ['id']
    })
    if (!subjects) {
        throw new NotFoundError('Subjects doesnt exist')
    }
    return subjects
}

export const updateSubjectsService = async (id: number, data: SubjectAttributes) => {
    const subject = await db.Subject.findOne({
        where: {id}
    })
    if (!subject) {
        throw new NotFoundError('Subject doesnt exist')
    }
    await subject.update(data)

    return subject
}

export const deleteSubjectService = async (id: number) => {
    const subject = await db.Subject.findOne({
        where: {id}
    })
    if (!subject) {
        throw new NotFoundError('Subject doesnt exist')
    }
    await subject.destroy()

    return "deleted subject"
}