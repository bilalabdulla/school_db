import express from 'express'
import { createTeachers, deleteTeacher, getTeacher, getTeachers, updateTeacher } from '../controllers/teachers'
const router = express.Router()

router.route('/').post(createTeachers).get(getTeachers)
router.route('/:id').get(getTeacher).patch(updateTeacher).delete(deleteTeacher)

export default router 
