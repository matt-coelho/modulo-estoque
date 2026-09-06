import service from "../service/service.enderecos.js"

async function create(req, res, next) {
  
  const entidade = {
    logradouro: req.body.logradouro,
    numero: req.body.numero,
    complemento: req.body.complemento,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    codigo_postal: req.body.codigo_postal,
    referencia: req.body.referencia,
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
  const entidade = { id: req.params.id }
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
    const resp = await service.readAll()
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
    logradouro: req.body.logradouro,
    numero: req.body.numero,
    complemento: req.body.complemento,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    codigo_postal: req.body.codigo_postal,
    referencia: req.body.referencia,
  }
  try {
  } catch (err) {
    next(err)
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
