async function create(entidade, conn) {
  const sql = "insert into almoxarifados(nome, id_endereco)values($1, $2) returning id"
  const values = [entidade.nome, entidade.id_endereco]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function read(entidade, conn) {
  const sql = "select id, nome, id_endereco from almoxarifados where id = $1"
  const values = [entidade.id]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function readAll(conn) {
  const sql = "select id, id_endereco, nome from almoxarifados order by nome"
  const res = await conn.query(sql)
  return res.rows
}

async function update(entidade, conn) {
  const sql = "update almoxarifados set nome = $1 where id = $2"
  const values = [entidade.nome, entidade.id]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function remove(entidade, conn) {
  const sql = "delete from almoxarifados where id = $1"
  const values = [entidade.id]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

export default { create, read, readAll, update, remove }