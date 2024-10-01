import express from 'express'
import { createClass, deleteClass, getClasses, updateClasses } from '../controllers/class'
const router = express.Router()

router.route('/').post(createClass).get(getClasses)
router.route('/:classId').patch(updateClasses).delete(deleteClass)

export default router