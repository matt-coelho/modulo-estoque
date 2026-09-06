import service from "../service/service.produtos.js"

async function create(req, res, next) {
  
  const entidade = {
    codigo: req.body.codigo,
    descricao: req.body.descricao,
    id_categoria: req.body.id_categoria,
    preco: req.body.preco,
    custo: req.body.custo,
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
  let entidade = { id: req.params.id }

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

async function reads(req, res, next) {
  try {
    let entidade = {}
    if(req.query.id_produto){
      entidade.id_produto = req.query.id_produto
    }
    if(req.query.id_categoria){
      entidade.id_categoria = req.query.id_categoria
    }
    if(req.query.id_almoxarifado){
      entidade.id_almoxarifado = req.query.id_almoxarifado
    }
    const resp = await service.readAll(entidade)
    if (!resp) {
      res.status(200).json({
        status: "ok",
        message: "Nenhum registro foi encontrado.",
      })
    } else {
      res.send(resp)
    }
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  const entidade = {
    id: req.body.id, //req.params.id, //req.query.id
    codigo: req.body.codigo,
    descricao: req.body.descricao,
    id_categoria: req.body.id_categoria,
    preco: req.body.preco,
    custo: req.body.custo
  }

  try {
    const entidadeDB = await service.read(entidade)
    if (entidadeDB) {
      try {
        const resp = await service.update(entidade)
        if (!resp) {
          res
            .status(200)
            .json({ status: "ok", message: "Atualização bem sucedida." })
        }
      } catch (err) {
        next(err)
      }
    } else {
      res
        .status(404)
        .json({ status: "falhou", message: `A atualização falhou.` })
    }
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  const entidade = {
    id: req.params.id,
  }
  const entidadeDB = await service.read(entidade)
  if (entidadeDB) {
    try {
      const resp = await service.remove(entidade)
      if (!resp) {
        res
          .status(200)
          .json({ status: "ok", message: "Cadastro removido com sucesso." })
      }
    } catch (err) {
      next(err)
    }
  } else {
    res
      .status(404)
      .json({ status: "falhou", message: `A remoção do cadastro falhou.` })
  }
}

export default { create, read, reads, update, remove }
