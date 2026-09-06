async function create(entidade, conn) {
  const sql = "insert into produtos(codigo, descricao, id_categoria, preco, custo)values($1, $2, $3, $4, $5) returning id"
  const values = [
    entidade.codigo,
    entidade.descricao,
    entidade.id_categoria,
    entidade.preco,
    entidade.custo
  ]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function read(entidade, conn) {
  let sql = `select codigo, descricao, preco, custo, id, id_categoria from produtos where id = $1`
  let values = [entidade.id]
    
  const res = await conn.query(sql, values)
  return res.rows
}

async function readAll(entidade, conn) {
  let sql = `select codigo, descricao, preco, custo, estoque, categoria, id_produto, id_categoria, id_almoxarifado from vw_estoque_produto_almoxarifado`
  let values = []
  
  if(entidade.id_categoria){
    sql += ` where id_categoria = $1`
    values.push(entidade.id_categoria)
    if(entidade.id_almoxarifado){
      sql += ` and id_almoxarifado = $2`
      values.push(entidade.id_almoxarifado)
    }
  }else{
    if(entidade.id_almoxarifado){
      sql += ` where id_almoxarifado = $1`
      values.push(entidade.id_almoxarifado)
    }
  }  
  const res = await conn.query(sql, values)
  return res.rows
}

async function update(entidade, conn) {
  const sql = "update produtos set codigo = $2, descricao = $3, preco = $4, custo = $5 where id = $1"
  const values = [
    entidade.id,
    entidade.codigo,
    entidade.descricao,
    entidade.preco,
    entidade.custo
  ]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function remove(entidade, conn) {
  const sql = "delete from produtos where id = $1"
  const values = [entidade.id]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

export default { create, read, readAll, update, remove }