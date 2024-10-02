import BadRequestError from "../errors/bad-request"
import NotFoundError from "../errors/not-found"
import db from "../models"
import { ClassAttributes } from "../types/class"

export const createClassService = async (data: ClassAttributes) => {
    const oldClass = await db.Class.findOne({
        where: { Grade: data.Grade, Division: data.Division}
    })
    if (oldClass) {
        throw new BadRequestError('Class already exists')
    }
    const classes = await db.Class.create(data)
    return classes
}                                                                        

export const getClassesService = async () => {
    const classes = await db.Class.findAll({
        order: ['id']
    })

    if (!classes) {
        throw new NotFoundError('Class doesnt exist')
    } 
    return classes 
}

export const updateClassesService = async (data: ClassAttributes, classId: number) => {
    const classes = await db.Class.findOne({ 
        where: {id: classId}
     })

     if (!classes) {
        throw new NotFoundError('Class doesnt exist')
     }

    await classes.update(data)

    return classes   
}

export const deleteClassService = async (classId: number) => {
    const classes = await db.Class.findOne({
        where: {id: classId}
    })

    if (!classes) {
        throw new NotFoundError('Class doesnt exist')
    }

    await classes.destroy()

    return "deleted class"
}

