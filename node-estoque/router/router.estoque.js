import express from "express"
import controller from "../controller/controller.estoque.js"

const router = express.Router()

router.get("/:id_almoxarifado", controller.read) //?id_produto=

export default router
