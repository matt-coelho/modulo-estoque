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

async function read_estoque_geral() {
    let conn
    try{
        conn = await db.connect()
        return await repository.read_estoque_geral(conn)
    }catch(err){
        throw err
    }finally{
        if(conn)
            conn.release()
    }
}

async function read_concentrado_custovenda() {
    let conn
    try{
        conn = await db.connect()
        return await repository.read_concentrado_custovenda(conn)
    }catch(err){
        throw err
    }finally{
        if(conn)
            conn.release()
    }
}

async function read_top_produtos() {
    let conn
    try{
        conn = await db.connect()
        return await repository.read_top_produtos(conn)
    }catch(err){
        throw err
    }finally{
        if(conn)
            conn.release()
    }
}

async function read_resumo_categoria() {
    let conn
    try{
        conn = await db.connect()
        return await repository.read_resumo_categoria(conn)
    }catch(err){
        throw err
    }finally{
        if(conn)
            conn.release()
    }
}

export default { create, read, read_estoque_geral, read_concentrado_custovenda, read_top_produtos, read_resumo_categoria }