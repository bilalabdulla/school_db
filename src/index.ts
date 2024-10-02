import express from 'express'
const app = express()
const port = process.env.PORT || 5017
import db from '../models'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import { students } from '../seeders/students'
import { teachers } from '../seeders/teachers'
import { subjects } from '../seeders/subjects'
import { subjectEnrollments } from '../seeders/subjectenrollments'
import { subjectTeachers } from '../seeders/subjectteachers'
import cookieParser from 'cookie-parser'
import 'express-async-errors'

import studentsRouter from '../routes/students'
import teachersRouter from '../routes/teachers'
import subjectsRouter from '../routes/subjects'
import subjectEnrollmentsRouter from '../routes/subjectenrollments'
import subjectTeachersRouter from '../routes/subjectteachers'
import classesRouter from '../routes/class'
import authRouter from '../routes/auth'
import departmentsRouter from '../routes/departments'
import { validateToken } from './JWT'
import { departments } from '../seeders/departments'
import errorHandlerMiddleware from '../middlewares/error-handler'

const whitelist = [
    'http://localhost:5017',
    'https://yourprod.ip.address.com',
    'http://<your local IP>:<port>'
]

const corsOptions = {
    credentials: true,
    origin: (origin: any, callback: any) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error(" not allowed by CORS" + origin))
        }
    },
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/api/v1/students', studentsRouter)
app.use('/api/v1/teachers', validateToken, teachersRouter)
app.use('/api/v1/subjects', validateToken, subjectsRouter)
app.use('/api/v1/subjectenrollments', validateToken, subjectEnrollmentsRouter)
app.use('/api/v1/subjectteachers', validateToken, subjectTeachersRouter)
app.use('/api/v1/classes', validateToken, classesRouter)
app.use('/api/v1/departments', validateToken, departmentsRouter)
app.use('/api/v1/auth', authRouter) 

app.use(errorHandlerMiddleware)

// const createStudents = () => {
//     students.map((student) => {
//         db.Student.create(student)
//     })
// }
// createStudents()

// const createTeachers = () => {
//     teachers.map((teacher) => {
//         db.Teacher.create(teacher)
//     })
// }
// createTeachers()

// const createSubjects = () => {
//     subjects.map((subject) => {
//         db.Subject.create(subject)
//     })
// }
// createSubjects()

// const createSubjectEnrollments = () => {
//     subjectEnrollments.map((enrollment) => {
//         db.SubjectEnrollments.create(enrollment)
//     })
// }             
// createSubjectEnrollments()

// const createSubjectTeachers = () => {
//     subjectTeachers.map((subjectTeacher) => {
//         db.SubjectTeachers.create(subjectTeacher)
//     })
// }
// createSubjectTeachers()

// const createDepartments = () => {
//     departments.map((department) => {
//         db.Department.create(department)
//     })
// }
// createDepartments()

app.get('/', async (req, res) => {
    res.status(200).json("good job")
}) 

db.sequelize.sync({alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`app is listening on port ${port}`);
    })    
})