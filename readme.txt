Módulo de Controle de Estoque

Aplicação desenvolvida para demonstrar uma implementação completa de controle de estoque por almoxarifado, utilizando Vue.js no frontend, Node.js no backend e PostgreSQL para persistência.

O sistema permite cadastrar produtos, categorias, enderecos e almoxarifados, além de registrar entradas e saídas e consultar o histórico e os resumos das movimentações.

---------------------------------------------------------------------------------------------------------------------------------------------
nodejs 22.18.0 || >=24.12.0
postgresql 9.4

local
node npm run main
vue  npm run dev / build + preview
docker
docker compose up -d --build
---------------------------------------------------------------------------------------------------------------------------------------------

Endpoints

-get /categorias
[{
    "id": "uuid",
    "nome": "..."
}]
-post /categorias
{
    "nome": "..."
}
-put /categorias
{
    "id": "uuid",
    "nome": "..."
}
-delete /categorias/uuid
-----------------------------------------------------------------------------
-get /enderecos
[{
    "id": "uuid",
    "logradouro": "...",
    "numero": "1234",
    "complemento": "...",
    "bairro": "...",
    "cidade": "...",
    "codigo_postal": "00000-000",
    "referencia": "..."
}]
-post /enderecos
{
    "logradouro": "...",
    "numero": "1234",
    "complemento": "...",
    "bairro": "...",
    "cidade": "...",
    "codigo_postal": "00000-000",
    "referencia": "..."
}
-put /enderecos
{
    "id": "uuid",
    "logradouro": "...",
    "numero": "1234",
    "complemento": "...",
    "bairro": "...",
    "cidade": "...",
    "codigo_postal": "00000-000",
    "referencia": "..."
}
-delete /enderecos/uuid
-----------------------------------------------------------------------------
-get /produtos
[{
    "codigo": "PROD-001",
    "descricao": "...",
    "preco": "99.90",
    "custo": "65.00",
    "estoque": "17.00",
    "categoria": "...",
    "id_produto": "uuid",
    "id_categoria": "uuid",
    "id_almoxarifado": "uuid"
}]
-get /produtos/uuid
{
    "codigo": "PROD-001",
    "descricao": "...",
    "preco": "69.90",
    "custo": "50.00",
    "id": "uuid",
    "id_categoria": "uuid"
}
-post /produtos
{
    "codigo": "...",
    "descricao": "...",
    "preco": "99.90",
    "custo": "50.00",
    "id_categoria": "uuid"
}
-put /produtos
{
    "codigo": "...",
    "descricao": "...",
    "preco": "99.90",
    "custo": "50.00",
    "id_categoria": "uuid"
    "id_produto": "uuid"
}
-delete /produtos/uuid
-----------------------------------------------------------------------------
-get /almoxarifados
[{
    "id": "uuid",
    "id_endereco": "uuid",
    "nome": "..."
}]
-get /almoxarifados/uuid
{
    "id": "uuid",
    "nome": "...",
    "endereco": {
        "id": "uuid",
        "logradouro": "...",
        "numero": "...",
        "complemento": "...",
        "bairro": "...",
        "cidade": "...",
        "codigo_postal": "00000-000",
        "referencia": "..."
    }
}
-post /almoxarifados
{
    "id_endereco": "uuid",
    "nome": "..."
}
-put /almoxarifados
{
    "id": "uuid",
    "id_endereco": "uuid",
    "nome": "..."
}
-delete /almoxarifados/uuid
-----------------------------------------------------------------------------
-get /movimentacoes/id_almoxarifado(uuid)?id_produto=uuid
-get /movimentacoes/resumo/geral
-get /movimentacoes/resumo/concentrado
-get /movimentacoes/resumo/produtos
-get /movimentacoes/resumo/categoria
-post /movimentacoes
{
    "id_produto" : "uuid",
    "id_almoxarifado": "uuid",
    "tipo": "E"/"S",
    "quantidade": 10,
    "observacao": ""    
}
-----------------------------------------------------------------------------
-get /estoque/id_almoxarifado(uuid)?id_produto=uuid