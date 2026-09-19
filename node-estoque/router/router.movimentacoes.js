import express from "express"
import controller from "../controller/controller.movimentacoes.js"

const router = express.Router()

router.post("/", controller.create)

router.get("/:id_almoxarifado", controller.read) //?id_produto=

router.get("/resumo/geral", controller.read_estoque_geral)

router.get("/resumo/concentrado", controller.read_concentrado_custovenda)

router.get("/resumo/produtos", controller.read_top_produtos)

router.get("/resumo/categoria", controller.read_resumo_categoria)

export default router
