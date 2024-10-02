import BadRequestError from "../errors/bad-request"
import NotFoundError from "../errors/not-found"
import db from "../models"
import { SubjectEnrollmentAttributes } from "../types/subjectenrollments"
import { SubjectEnrollmentParams } from "../types/subjectenrollments.params"


export const createSubjectEnrollmentService = async (data: SubjectEnrollmentAttributes) => {
    const oldEnrollment = await db.SubjectEnrollments.findOne({
        where: { SubjectId: data.SubjectId, StudentId: data.StudentId} 
    })
    if (oldEnrollment) {
        throw new BadRequestError('Enrollment already exists')
    }

    const enrollment = db.SubjectEnrollments.create(data)
    return enrollment
}

export const getSubjectEnrollmentService = async (params: SubjectEnrollmentParams) => {
    const { SubjectEnrollmentId } = params
    const enrollment = db.SubjectEnrollments.findOne({
        where: { SubjectEnrollmentId }
    })
    if (!enrollment) {
        throw new NotFoundError('Enrollment doesnt exist')
    }
    return enrollment
}

export const getSubjectEnrollmentsService = async () => {
    const enrollments = db.SubjectEnrollments.findAll({
        order: ['SubjectEnrollmentId']
    })
    if (!enrollments) {
        throw new NotFoundError('enrollments doesnt exist')
    }
    return enrollments 
}

export const updateSubjectEnrollmentsService = async (data: SubjectEnrollmentAttributes, params: SubjectEnrollmentParams) => {
    const { SubjectEnrollmentId } = params 
    const { AverageMarks, Score, Attendance } = data 
    const enrollment = await db.SubjectEnrollments.findOne({
        where: { SubjectEnrollmentId }
    })
    if (!enrollment) {
        throw new NotFoundError('enrollment doesnt exist')
    }

    await enrollment.update({ AverageMarks, Score, Attendance})
    return enrollment
}


export const deleteSubjectEnrollmentsService = async (params: SubjectEnrollmentParams) => {
    const { SubjectEnrollmentId } = params 
    const enrollment = await db.SubjectEnrollments.findOne({
        where: { SubjectEnrollmentId }
    })
    if (!enrollment) {
        throw new NotFoundError('Subject doesnt exist')
    }

    await enrollment.destroy()

    return "Deleted Enrollment"
}