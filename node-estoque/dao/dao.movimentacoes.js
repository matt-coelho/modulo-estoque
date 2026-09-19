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
  sql += ` order by m.movimentacao, m.tipo`
  const res = await conn.query(sql, values)
  return res.rows
}

async function read_estoque_geral(conn) {
  let sql =
    `select qtd_produtos_distintos as qtd_produtos,
    qtd_almoxarifados,
    qtd_itens_total as qtd_itens,
    valor_total_custo as vl_total_custo,
    valor_total_venda as vl_total_venda,
    margem_potencial as margem
    from vw_resumo_estoque_geral `
  
  const res = await conn.query(sql)
  return res.rows
}

async function read_concentrado_custovenda(conn) {
  let sql =
    `select almoxarifado,
    qtd_produtos_distintos as qtd_produtos,
    qtd_itens_total as qtd_itens,
    valor_total_custo as vl_total_custo,
    valor_total_venda as vl_total_venda,
    margem_potencial as margem
    from vw_concentrado_estoque_custo_venda `
  
  const res = await conn.query(sql)
  return res.rows
}

async function read_top_produtos(conn) {
  let sql =
    `select codigo, descricao, categoria, quantidade_total as qtd_total,
    valor_total_custo as vl_total_custo,
    valor_total_venda as vl_total_venda
    from vw_top_produtos_valor_estoque `
  
  const res = await conn.query(sql)
  return res.rows
}

async function read_resumo_categoria(conn) {
  let sql =
    `select categoria, qtd_produtos_distintos as qtd_produtos,
    qtd_itens_total as qtd_itens,
    valor_total_custo as vl_total_custo,
    valor_total_venda as vl_total_venda
    from vw_resumo_estoque_categoria `
  
  const res = await conn.query(sql)
  return res.rows
}

export default { create, read, read_resumo_categoria, read_top_produtos, read_concentrado_custovenda, read_estoque_geral }