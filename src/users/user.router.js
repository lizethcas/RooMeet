import express from "express"
import *  as controllerUsers from "./users.controller.js"

const router = express.Router()

router.get("/profile", controllerUsers.getUserProfile)


export default router