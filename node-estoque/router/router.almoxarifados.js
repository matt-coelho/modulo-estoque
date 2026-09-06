import express from "express"
import controller from "../controller/controller.almoxarifados.js"

const router = express.Router()

router.post("/", controller.create)

router.get("/", controller.reads)

router.get("/:id", controller.read)

router.put("/", controller.update)

router.delete("/:id", controller.remove)

export default router
