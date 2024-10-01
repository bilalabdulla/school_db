import express from 'express'
import { createSubjects, deleteSubject, getSubject, getSubjects, updateSubjects } from '../controllers/subjects'
const router = express.Router()

router.route('/').post(createSubjects).get(getSubjects)
router.route('/:id').get(getSubject).patch(updateSubjects).delete(deleteSubject)

export default router 

