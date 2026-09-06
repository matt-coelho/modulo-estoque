async function create(entidade, conn) {
  const sql = "insert into movimentacoes(id_produto, id_almoxarifado, tipo, quantidade, observacao)values($1, $2, $3, $4, $5) returning id"
  const values = [
    entidade.id_produto,
    entidade.id_almoxarifado,
    entidade.tipo,
    entidade.quantidade,
    entidade.observacao
  ]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function read(entidade, conn) {
  let sql =
    `select a.nome as almoxarifado, m.tipo, m.quantidade, m.observacao, m.movimentacao, c.nome as categoria, p.codigo as codigo_produto, p.descricao as nome_produto 
    from movimentacoes m 
    join almoxarifados a on m.id_almoxarifado = a.id 
    join produtos p on m.id_produto = p.id 
    join categorias c on p.id_categoria = c.id 
    where m.id_almoxarifado = $1`
  
  let values = [entidade.id_almoxarifado]
  
  if(entidade.id_produto){
    sql = sql + ` and m.id_produto = $2`
    values.push(entidade.id_produto)
  }
  
  const res = await conn.query(sql, values)
  return res.rows
}

export default { create, read }