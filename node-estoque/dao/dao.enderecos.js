async function create(entidade, conn) {
  const sql = "insert into enderecos(logradouro, numero, complemento, bairro, cidade, codigo_postal, referencia)values($1, $2, $3, $4, $5, $6, $7) returning id"
  const values = [
    entidade.logradouro,
    entidade.numero,
    entidade.complemento,
    entidade.bairro,
    entidade.cidade,
    entidade.codigo_postal,
    entidade.referencia
  ]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function read(entidade, conn) {
  const sql = "select id, logradouro, numero, complemento, bairro, cidade, codigo_postal, referencia from enderecos where id = $1"
  const values = [entidade.id]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function readAll(conn) {
  const sql = "select id, logradouro, numero, complemento, bairro, cidade, codigo_postal, referencia from enderecos order by cidade, bairro, logradouro, numero"
  const res = await conn.query(sql)
  return res.rows
}

async function update(entidade, conn) {
  const sql = "update enderecos set logradouro = $2, numero = $3, complemento = $4, bairro = $5, cidade = $6, codigo_postal = $7, referencia = $8 where id = $1"
  const values = [
    entidade.id,
    entidade.logradouro,
    entidade.numero,
    entidade.complemento,
    entidade.bairro,
    entidade.cidade,
    entidade.codigo_postal,
    entidade.referencia
  ]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

async function remove(entidade, conn) {
  const sql = "delete from enderecos where id = $1"
  const values = [entidade.id]
  const res = await conn.query(sql, values)
  return res.rows[0]
}

export default { create, read, readAll, update, remove }