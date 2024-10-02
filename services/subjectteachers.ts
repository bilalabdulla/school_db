import BadRequestError from "../errors/bad-request"
import NotFoundError from "../errors/not-found"
import db from "../models"
import { SubjectTeachersAttributes } from "../types/subjectteachers"
import { SubjectTeachersParams } from "../types/subjectTeachers.params"


export const createSubjectTeachersService = async (data: SubjectTeachersAttributes) => {
    const { SubjectId, TeacherId } = data
    const subject = await db.SubjectTeachers.findOne({
        where: { SubjectId }
    })
    if (subject) {
        throw new BadRequestError('Subject already exists')
    }
    const subjectTeacher = await db.SubjectTeachers.create({
        SubjectId, TeacherId
    })
        
    return subjectTeacher
}

export const getSubjectTeacherService = async (params: SubjectTeachersParams) => {
    const { SubjectId, TeacherId } = params
    const subjectTeacher = await db.SubjectTeachers.findOne({
        where: { SubjectId, TeacherId}
    })
    if (!subjectTeacher) {
        throw new NotFoundError('Subject and teacher doesnt exist')
    }
    return subjectTeacher
}

export const getSubjectTeachersService = async () => {
    const subjectTeachers = await db.SubjectTeachers.findAll({
        order: ['SubjectTeacherId']
    })
    if (!subjectTeachers) {
        throw new NotFoundError('Subjects and teachers doesnt exist')
    }
    return subjectTeachers
}

export const updateSubjectTeachersService = async (data: SubjectTeachersAttributes, params: SubjectTeachersParams) => {
    const { SubjectId } = params
    const { TeacherId } = data
    const subjectTeacher = await db.SubjectTeachers.findOne({
        where: {SubjectId}
    })
    if (!subjectTeacher) {
        throw new NotFoundError('Subject and teacher doesnt exist')
    }

    await subjectTeacher.update({TeacherId: TeacherId}, {
        where: {SubjectId}
    })

    return subjectTeacher 
}

export const deleteSubjectTeacherService = async (params: SubjectTeachersParams) => {
    const { SubjectId, TeacherId } = params 
    const subjectTeacher = await db.SubjectTeachers.findOne({
        where: { SubjectId, TeacherId }
    })
    if (!subjectTeacher) {
        throw new NotFoundError('Subject and teacher doesnt exist')
    }
         
    await subjectTeacher.destroy()

    return "deleted SubjectTeacher"
}
