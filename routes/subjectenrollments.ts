import express from 'express'
import { createSubjectEnrollments, deleteSubjectEnrollments, getSubjectEnrollment, getSubjectEnrollments, updateSubjectEnrollments } from '../controllers/subjectenrollments'
const router = express.Router()

router.route('/').post(createSubjectEnrollments).get(getSubjectEnrollments)
router.route('/:SubjectEnrollmentId').get(getSubjectEnrollment).patch(updateSubjectEnrollments).delete(deleteSubjectEnrollments)

export default router 