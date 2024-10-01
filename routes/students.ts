import express from 'express'
import { createStudents, deleteStudents, getStudent, getStudents, updateStudents } from '../controllers/students'
const router = express.Router()

router.route('/').post(createStudents).get(getStudents)
router.route('/:id').get(getStudent).patch(updateStudents).delete(deleteStudents)

export default router       