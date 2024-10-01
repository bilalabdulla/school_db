import db from "../models"
import { ClassAttributes } from "../types/class"



export const createClassService = async (data: ClassAttributes) => {
    
    try {
        const classes = await db.Class.create(data)
        return classes    
    } catch (error) {
        return error 
    }
}                                                                        

export const getClassesService = async () => {
    try {
        const classes = await db.Class.findAll({
            order: ['id']
        })
        return classes 
    } catch (error) {
        return error
    }
}

export const updateClassesService = async (data: ClassAttributes, classId: number) => {

    try {
        const classes = await db.Class.update(data, {
            where:  {id: classId}
        })
        return classes   
    } catch (error) {
        return error   
    }
}

export const deleteClassService = async (classId: number) => {

    try {
        const classes = await db.Class.findOne({
            where: {id: classId}
        })

        await classes.destroy()

        return "deleted class"
    } catch (error) {
        return error 
    }
}

