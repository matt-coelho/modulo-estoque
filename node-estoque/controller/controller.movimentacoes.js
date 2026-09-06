import service from "../service/service.movimentacoes.js"

async function create(req, res, next) {
  
  const entidade = {
    id_produto : req.body.id_produto,
    id_almoxarifado: req.body.id_almoxarifado,
    tipo: req.body.tipo,
    quantidade: req.body.quantidade,
    observacao: req.body.observacao
  }

  try {
    const resp = await service.create(entidade)
    if(!resp){
        res.status(200).json({
          status: "ok",
          message: "Cadastro realizado.",
        })
    } else {
      res.send(resp)
    }
  } catch (err) {
    next(err)
  }
}

async function read(req, res, next) {
  let entidade = {}
  if(req.query.id_produto){
    entidade = {
        id_almoxarifado: req.params.id_almoxarifado,
        id_produto: req.query.id_produto
    }
  }else{
    entidade = {
        id_almoxarifado: req.params.id_almoxarifado
    }
  }
  
  try {
    const resp = await service.read(entidade)
    if (!resp) {
      res.status(404).json({
        status: "falhou",
        message: "Registro não foi encontrado.",
      })
    } else {
      res.send(resp)
    }
  } catch (err) {
    next(err)
  }
}

export default { create, read, }
