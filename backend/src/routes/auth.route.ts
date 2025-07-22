import express from 'express'
import { login, logout, onboard, signup } from '../controllers/auth.controller'
import { protectRoute } from '../middleware/auth.middleware'
import { AuthenticatedRequest } from '../types/user'

const router  = express.Router()

router.post('/signup',signup)
router.post('/login', login)
router.post('/logout', logout)

router.post("/onboarding", protectRoute,onboard)

router.get('/me',protectRoute, (req: AuthenticatedRequest, res) => {
   res.status(200).json({success: true,user: req.user});
});

export default router