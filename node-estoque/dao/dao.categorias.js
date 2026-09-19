async function create(entidade, conn) {
  const sql = "insert into categorias(nome)values($1) returning id"
  const values = [entidade.nome]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function read(entidade, conn) {
  const sql = "select id, nome from categorias where id = $1"
  const values = [entidade.id]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function readAll(conn) {
  const sql = "select id, nome from categorias order by nome"
  const res = await conn.query(sql)
  return res.rows
}

async function update(entidade, conn) {
  const sql = "update categorias set nome = $1 where id = $2"
  const values = [entidade.nome, entidade.id]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function remove(entidade, conn) {
  const sql = "delete from categorias where id = $1"
  const values = [entidade.id]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

export default { create, read, readAll, update, remove }