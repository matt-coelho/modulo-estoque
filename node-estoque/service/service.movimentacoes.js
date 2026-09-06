import db from '../db/db.js'
import repository from "../dao/dao.movimentacoes.js"

async function create(entidade) {
    let conn
    try {
        conn = await db.connect()
        await conn.query('BEGIN')
        const resp = await repository.create(entidade, conn)
        await conn.query('COMMIT')
        return resp
    } catch (err) {
        if (conn) {
            try {
                await conn.query('ROLLBACK')
            } catch (rollbackErr) {
                console.error(rollbackErr)
            }
        }
        throw err
    } finally {
        if (conn)
            conn.release()
    }
}

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

export default { create, read }