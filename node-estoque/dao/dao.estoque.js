async function read(entidade, conn) {
  const sql = "select quantidade from estoque where id_produto = $1 and id_almoxarifado = $2 "
  const values = [entidade.id_produto, entidade.id_almoxarifado]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

export default { read }