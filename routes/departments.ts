import express from 'express'
import { createDepartments, getDepartments } from '../controllers/departments'
const router = express.Router()

router.route('/').post(createDepartments).get(getDepartments)

export default router 

