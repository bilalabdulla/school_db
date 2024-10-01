import db from "../models"
import { SubjectTeachersAttributes } from "../types/subjectteachers"
import { SubjectTeachersParams } from "../types/subjectTeachers.params"


export const createSubjectTeachersService = async (data: SubjectTeachersAttributes) => {
    const { SubjectId, TeacherId } = data
     try {

        const subject = db.SubjectTeachers.findOne({
            where: { SubjectId }
        })

        if (subject !== null) {
            return "Subject already exists" 
        }    

        const subjectTeacher = db.SubjectTeachers.create({
            SubjectId, TeacherId
        })
        
        return subject
     } catch (error) {
        return error
     }
}

export const getSubjectTeacherService = async (params: SubjectTeachersParams) => {
    const { SubjectId, TeacherId } = params
    try {
        const subjectTeacher = await db.SubjectTeachers.findOne({
            where: { SubjectId, TeacherId}
        })
        return subjectTeacher
    } catch (error) {
        return error
    }
}

export const getSubjectTeachersService = async () => {
    try {              
        const subjectTeachers = await db.SubjectTeachers.findAll({
            order: ['SubjectTeacherId']
        })
        return subjectTeachers
    } catch (error) {
        return error    
    }
}

export const updateSubjectTeachersService = async (data: SubjectTeachersAttributes, params: SubjectTeachersParams) => {
    const { SubjectId } = params
    const { TeacherId } = data
    try {
        const subjectTeacher = await db.SubjectTeachers.update({TeacherId}, {
            where: {SubjectId}
        })

        return subjectTeacher 
    } catch (error) {
        return error
    }
}

export const deleteSubjectTeacherService = async (params: SubjectTeachersParams) => {
    const { SubjectId, TeacherId } = params 
    try {                               
        const subjectTeacher = await db.SubjectTeachers.findOne({
            where: { SubjectId, TeacherId }
        })
            
        await subjectTeacher.destroy() 

        return "deleted SubjectTeacher"     
    } catch (error) {
        return error
    }
}
