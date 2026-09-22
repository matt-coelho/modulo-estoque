import express from "express"
import rCategorias from "../router/router.categorias.js"
import rEnderecos from "../router/router.enderecos.js"
import rProdutos from "../router/router.produtos.js"
import rAlmoxarifados from "../router/router.almoxarifados.js"
import rMovimentacoes from "../router/router.movimentacoes.js"
import rEstoque from "../router/router.estoque.js"

import cors from "cors"

const srv = express()

srv.use(express.json())
srv.use(cors())

srv.use("/categorias", rCategorias)
srv.use("/enderecos", rEnderecos)
srv.use("/produtos", rProdutos)
srv.use("/almoxarifados", rAlmoxarifados)
srv.use("/movimentacoes", rMovimentacoes)
srv.use("/estoque", rEstoque)

srv.use((err, req, res, next) => {
  res.status(500).send({ error: err.message })
})

export default srv
