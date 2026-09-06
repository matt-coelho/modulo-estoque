import express from "express"
import controller from "../controller/controller.movimentacoes.js"

const router = express.Router()

router.post("/", controller.create)

router.get("/:id_almoxarifado", controller.read) //?id_produto=

export default router
