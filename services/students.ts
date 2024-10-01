import db from "../models"
import { StudentAttributes } from "../types/student"
import { studentParams } from "../types/students.params"


export const createStudentsService = async (data: StudentAttributes) => {
    try {
        const student = db.Student.create(data)
        return student
    } catch (error) {
        return error 
    }
}              

export const getStudentService = async (id: number) => {
    try {
        const student = await db.Student.findOne({
            where: {id}
        })
        return student 
    } catch (error) {
        return error
    }
}   

export const getStudentsService = async () => {
    try {
        const products = await db.Student.findAll({
            order: ['id']
        })
        return products 
    } catch (error) {
        return error 
    }
}

export const updateStudentsService = async (id: number, data: StudentAttributes) => {
    try {         
        const student = await db.Student.update(data, {
            where: {id}       
        })

        student.save()

        return student
    } catch (error) {     
        return error
    }
}    

export const deleteStudentService = async (id: number) => {
    try {
        const student = await db.Student.findOne({
            where: {id}
        })

        await student.destroy()             

        return "deleted student"
    } catch (error) {
        return error
    } 
}