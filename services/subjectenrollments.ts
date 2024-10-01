import db from "../models"
import { SubjectEnrollmentAttributes } from "../types/subjectenrollments"
import { SubjectEnrollmentParams } from "../types/subjectenrollments.params"


export const createSubjectEnrollmentService = async (data: SubjectEnrollmentAttributes) => {
    const { AverageMarks, SubjectId, StudentId, Score, Attendance } = data 
    try {
        const enrollment = db.SubjectEnrollments.create({
            SubjectId, StudentId, AverageMarks, Attendance, Score
        })
        return enrollment
    } catch (error) {
        return error 
    }
}

export const getSubjectEnrollmentService = async (params: SubjectEnrollmentParams) => {
    const { SubjectEnrollmentId } = params 
    try {
        const enrollment = db.SubjectEnrollments.findOne({
            where: { SubjectEnrollmentId }
        })
        return enrollment
    } catch (error) {
        return error
    }
}

export const getSubjectEnrollmentsService = async () => {
    try {
        const enrollments = db.SubjectEnrollments.findAll({
            order: ['SubjectEnrollmentId']
        })
        return enrollments 
    } catch (error) {
        return error 
    }
}

export const updateSubjectEnrollmentsService = async (data: SubjectEnrollmentAttributes, params: SubjectEnrollmentParams) => {
    const { SubjectEnrollmentId } = params 
    const { AverageMarks, Score, Attendance } = data 
    try {
        const enrollment = db.SubjectEnrollments.update({AverageMarks, Score, Attendance}, {
            where: { SubjectEnrollmentId }
        })
        return enrollment
    } catch (error) {
        return error 
    }
}


export const deleteSubjectEnrollmentsService = async (params: SubjectEnrollmentParams) => {
    const { SubjectEnrollmentId } = params 
    try {
        const enrollment = await db.SubjectEnrollments.findOne({
            where: { SubjectEnrollmentId }
        })

        await enrollment.destroy()

        return "Deleted Enrollment"
    } catch (error) {
        return error 
    }
}