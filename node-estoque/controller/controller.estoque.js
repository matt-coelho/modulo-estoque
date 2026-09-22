import service from "../service/service.estoque.js"

async function read(req, res, next) {
  const entidade = {
      id_almoxarifado: req.params.id_almoxarifado,
      id_produto: req.query.id_produto
  }
  try {
    const resp = await service.read(entidade)
    if (!resp) {
      res.status(200).json({
        quantidade: 0,
      })
    } else {
      res.send(resp)
    }
  } catch (err) {
    next(err)
  }
}

export default { read }
