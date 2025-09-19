import express from "express"
import *  as controllerUsers from "./users.controller.js"

const router = express.Router()

router.get("/", controllerUsers.getAllUsers)
router.get("/profile/:userId", controllerUsers.getUserProfile)
router.post("/register", controllerUsers.registerUser)


export default router