import db from '../db/db.js'
import repository from "../dao/dao.estoque.js"

async function read(entidade) {
  let conn
  try{
    conn = await db.connect()
    return await repository.read(entidade, conn)
  }catch(err){
    throw err
  }finally{
    if(conn)
      conn.release()
  }
}

export default { read }