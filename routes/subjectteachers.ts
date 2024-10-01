import express from 'express'
import { createSubjectTeachers, deleteSubjectTeacher, getSubjectTeacher, getSubjectTeachers, updateSubjectTeachers } from '../controllers/subjectTeachers'
const router = express.Router()

router.route('/').post(createSubjectTeachers).get(getSubjectTeachers)
router.route('/:SubjectId').patch(updateSubjectTeachers)
router.route('/:SubjectId/:TeacherId').get(getSubjectTeacher).delete(deleteSubjectTeacher)

export default router 