<script>
import axios from "axios"
import CategoriasCombo from '../components/ComboboxCategorias.vue';
import AcoesListagem from "../components/AcoesListagem.vue"
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  name: "ProdutosView",
  components: {
    CategoriasCombo,
    AcoesListagem,
    LoadingSpinner,
  },
  data() {
    return { data: null, idCategoria: null, idEdicao: null, codigo: null, descricao: null, preco: null, custo: null }
  },
  methods: {
    async getData() {
      try {
        const resp = await axios.get(`${import.meta.env.VITE_API_PRODUTOS_URL}`)
        this.data = resp.data
      } catch (error) {
        console.log(error)
      }
    },
    async remover(id) {
      if (!confirm("Tem certeza que deseja remover este item?")) return
      let resp
      try {
        resp = await axios.delete(`${import.meta.env.VITE_API_PRODUTOS_URL}/${id}`)
        if(resp.status == 200 || resp.status == 204){
          this.data = this.data.filter((produtos) => produtos.id_produto !== id)
        }
        //await this.getData()
      } catch (error) {
        alert(`Não foi possível remover o produto. Podem existir movimentações associadas. ${error.message}`)
      }
    },
    editar(entidade) {
      this.idEdicao = entidade.id_produto
      this.codigo = entidade.codigo
      this.descricao = entidade.descricao
      this.idCategoria = entidade.id_categoria
      this.preco = entidade.preco
      this.custo = entidade.custo
    },
    clonar(entidade){
      this.editar(entidade)
      this.idEdicao = null
    },
    limparForm() {
      this.idEdicao = null
      this.codigo = null
      this.descricao = null
      this.idCategoria = null
      this.preco = null
      this.custo = null
    },
    async salvar() {
      try {
        if (this.idEdicao) {
          await axios.put(`${import.meta.env.VITE_API_PRODUTOS_URL}`, {
            nome: this.descricaoCategoria,
            id: this.idEdicao,
            codigo: this.codigo,
            descricao: this.descricao,
            id_categoria: this.idCategoria,
            preco: this.preco,
            custo: this.custo,
          })
        } else {
          await axios.post(`${import.meta.env.VITE_API_PRODUTOS_URL}`, {
            nome: this.descricaoCategoria,
            codigo: this.codigo,
            descricao: this.descricao,
            id_categoria: this.idCategoria,
            preco: this.preco,
            custo: this.custo,
          })
        }

        this.limparForm()
        await this.getData()
      } catch (error) {
        console.log(error)
        alert(`Erro ao salvar. ${error.message}`)
      }
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<template>  
  <h2>Produto</h2>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Cadastro/Edição</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Listagem</button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
      <form @submit.prevent="salvar">
        <div class="form-group">
          <label for="inputCodigoProduto">Código</label>
          <input type="text" class="form-control" v-model="codigo" id="inputCodigoProduto" aria-describedby="codigoProdutoHelp" placeholder="Digite o código do novo produto">
          <small id="codigoProdutoHelp" class="form-text text-muted">Código do produto.</small>
        </div>
        <div class="form-group">
          <label for="inputDescricaoProduto">Descrição</label>
          <input type="text" class="form-control" v-model="descricao" id="inputDescricaoProduto" aria-describedby="descricaoProdutoHelp" placeholder="Digite a descrição do produto">
          <small id="descricaoProdutoHelp" class="form-text text-muted">Descrição do produto.</small>
        </div>
        <CategoriasCombo v-model="idCategoria" />
        <div class="form-group">
          <label for="inputPreco">Preço</label>
          <input type="text" class="form-control" v-model="preco" id="inputPreco" aria-describedby="precoHelp" placeholder="Valor do produto">
          <small id="precoHelp" class="form-text text-muted">Valor de venda do produto.</small>
        </div>
        <div class="form-group">
          <label for="inputCusto">Custo</label>
          <input type="text" class="form-control" v-model="custo" id="inputCusto" aria-describedby="custoHelp" placeholder="Custo do produto">
          <small id="custoHelp" class="form-text text-muted">Custo de compra do produto.</small>
        </div>
        <button type="submit" class="btn btn-primary me-2">{{ idEdicao ? "Atualizar" : "Cadastrar" }}</button>
        <button type="button" class="btn btn-secondary" @click="limparForm">Limpar</button>
      </form>
    </div>
    <div class="tab-pane fade table-responsive" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Código</th>
            <th scope="col">Descrição</th>
            <th scope="col">Preço</th>
            <th scope="col">Custo</th>
            <th scope="col">Estoque</th>
            <th scope="col">Categoria</th>
            <th scope="col">Almoxarifado</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
          <template v-if="data && data.length > 0">
          <tbody>
            <tr v-for="(produto, index) in data" :key="produto.id_produto">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ produto.codigo }}</td>
              <td>{{ produto.descricao }}</td>
              <td>{{ produto.preco }}</td>
              <td>{{ produto.custo }}</td>
              <td>{{ produto.estoque }}</td>
              <td>{{ produto.categoria }}</td>
              <td>{{ produto.almoxarifado }}</td>
              <td>
                <AcoesListagem :entidade="produto" @editar="editar" @clonar="clonar" @remover="remover" />
              </td>
            </tr>
          </tbody>
          </template>
          <template v-else-if="data && data.length === 0">
              <tr>
                <td colspan="8">
                  <LoadingSpinner mensagem="Sem dados a exibir" :comSpinner="false"/>
                </td>
              </tr>
          </template>
          <template v-else>
              <tr>
                <td colspan="8">
                  <LoadingSpinner />
                </td>
              </tr>
          </template>
        </table>
    </div>
  </div>
  
</template>

<style></style>
