create extension if not exists "uuid-ossp";

create table categorias(
	id uuid primary key default uuid_generate_v4(),
	nome varchar(20) unique not null
);

create table enderecos(
	id uuid primary key default uuid_generate_v4(),
	logradouro varchar(200) not null,
	numero varchar(20),
	complemento varchar(255),
	bairro varchar(200),
	cidade varchar(200) not null,
	codigo_postal varchar(15),
	referencia varchar(255)
);

create table produtos(
	id uuid primary key default uuid_generate_v4(),
	codigo varchar(32) unique not null,
	descricao varchar(255),
	id_categoria uuid not null references categorias(id),
	preco numeric(15,2) not null,
	custo numeric(15,2) not null
);

create table almoxarifados(
	id uuid primary key default uuid_generate_v4(),
	nome varchar(20) not null,
	id_endereco uuid not null references enderecos(id)
);

create table movimentacoes(
	id uuid primary key default uuid_generate_v4(),
	id_produto uuid not null references produtos(id),
	id_almoxarifado uuid not null references almoxarifados(id),
	tipo char(1) not null check (tipo in ('E', 'S')),
	quantidade numeric(15,2) not null,
	observacao varchar(255),
	movimentacao timestamp not null default now()
);

create table estoque(
	id uuid not null default uuid_generate_v4(),
	id_produto uuid not null references produtos(id),
	id_almoxarifado uuid not null references almoxarifados(id),
	quantidade numeric(15,2) not null default 0,
	primary key(id_almoxarifado, id_produto)
);

-- Função que atualiza o estoque a cada movimentação inserida
create or replace function fn_atualiza_estoque()
returns trigger as $$
begin
	insert into estoque (id_produto, id_almoxarifado, quantidade)
	values (
		new.id_produto,
		new.id_almoxarifado,
		case when new.tipo = 'E' then new.quantidade else -new.quantidade end
	)
	on conflict (id_almoxarifado, id_produto)
	do update set quantidade = estoque.quantidade +
		(case when new.tipo = 'E' then new.quantidade else -new.quantidade end);

	return new;
end;
$$ language plpgsql;

-- Trigger associada à tabela movimentacoes
create trigger trg_atualiza_estoque
after insert on movimentacoes
for each row
execute function fn_atualiza_estoque();

create or replace view vw_estoque_produto_almoxarifado as
	select p.codigo, p.descricao as descricao, p.preco, p.custo as custo, coalesce(e.quantidade, 0) as estoque, c.nome as categoria, a.nome as almoxarifado,
	p.id as id_produto, c.id as id_categoria, a.id as id_almoxarifado
	from produtos p
	join categorias c on p.id_categoria = c.id
	left join estoque e on e.id_produto = p.id
	left join almoxarifados a on e.id_almoxarifado = a.id;
	
create or replace view vw_concentrado_estoque_custo_venda as
select a.nome as almoxarifado,
	count(distinct e.id_produto) as qtd_produtos_distintos,
	coalesce(sum(e.quantidade), 0) as qtd_itens_total,
	coalesce(sum(e.quantidade * p.custo), 0) as valor_total_custo,
	coalesce(sum(e.quantidade * p.preco), 0) as valor_total_venda,
	coalesce(sum(e.quantidade * (p.preco - p.custo)), 0) as margem_potencial
from almoxarifados a
left join estoque e on e.id_almoxarifado = a.id and e.quantidade > 0
left join produtos p on p.id = e.id_produto
group by a.id, a.nome
order by valor_total_venda desc;

create or replace view vw_resumo_estoque_geral as
select
	count(distinct e.id_produto) as qtd_produtos_distintos,
	count(distinct e.id_almoxarifado) as qtd_almoxarifados,
	coalesce(sum(e.quantidade), 0) as qtd_itens_total,
	coalesce(sum(e.quantidade * p.custo), 0) as valor_total_custo,
	coalesce(sum(e.quantidade * p.preco), 0) as valor_total_venda,
	coalesce(sum(e.quantidade * (p.preco - p.custo)), 0) as margem_potencial
from estoque e
join produtos p on p.id = e.id_produto
where e.quantidade > 0;

create or replace view vw_top_produtos_valor_estoque as
select
	p.id as id_produto,
	p.codigo,
	p.descricao,
	c.nome as categoria,
	sum(e.quantidade) as quantidade_total,
	sum(e.quantidade * p.custo) as valor_total_custo,
	sum(e.quantidade * p.preco) as valor_total_venda
from estoque e
join produtos p on p.id = e.id_produto
join categorias c on c.id = p.id_categoria
where e.quantidade > 0
group by p.id, p.codigo, p.descricao, c.nome
order by valor_total_custo desc
limit 20;

create or replace view vw_resumo_estoque_categoria as
select
	c.id as id_categoria,
	c.nome as categoria,
	count(distinct e.id_produto) as qtd_produtos_distintos,
	coalesce(sum(e.quantidade), 0) as qtd_itens_total,
	coalesce(sum(e.quantidade * p.custo), 0) as valor_total_custo,
	coalesce(sum(e.quantidade * p.preco), 0) as valor_total_venda
from categorias c
left join produtos p on p.id_categoria = c.id
left join estoque e on e.id_produto = p.id and e.quantidade > 0
group by c.id, c.nome
order by valor_total_venda desc;