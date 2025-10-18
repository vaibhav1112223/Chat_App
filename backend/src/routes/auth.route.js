import express from "express"
const router=express.Router()
import { checkAuth, login,logout,signup } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
import { updateProfile } from "../controllers/auth.controller.js"
import { getMessages,sendMessage } from "../controllers/message.controller.js"
router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)
router.put("/update-profile",protectRoute,updateProfile)
router.get("/check",protectRoute,checkAuth)
// router.get("/:id",protectRoute,getMessages)
// router.post("/send/:id",protectRoute,sendMessage)

export default router