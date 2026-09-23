<script>
import { formatData } from "@/components/utils.js";
import ComboboxAlmoxarifados from "../components/ComboboxAlmoxarifados.vue"
import ComboboxProdutos from "../components/ComboboxProdutos.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import axios from "axios"

export default {
  name: "MovimentacoesView",
  components: {
    ComboboxAlmoxarifados,
    ComboboxProdutos,
    LoadingSpinner
  },
  data() {
    return { data: null, almoxarifadoId: null, produtoId: null, almoxarifadoIdC: null, produtoIdC: null, tipoC: "", quantidadeC: null, obsC: null }
  },
  watch:{
    almoxarifadoId(novoId){
      if(novoId){
        this.getData(novoId)
      }else{
        this.data = null
      }
    },
    produtoId(novoId){
      if(novoId){
        this.getData(this.almoxarifadoId)
      }else{
        this.getData(this.almoxarifadoId)
      }
    }
  },
  methods: {
    formatData,
    async getData(almoxarifadoId) {
      if(almoxarifadoId && this.produtoId){
        try {
          const resp = await axios.get(`${import.meta.env.VITE_API_MOVIMENTACOES_URL}/${almoxarifadoId}?id_produto=${this.produtoId}`)
          this.data = resp.data
        } catch (error) {
          console.log(error)
        }
      }
      if(almoxarifadoId && !this.produtoId){
        try {
          const resp = await axios.get(`${import.meta.env.VITE_API_MOVIMENTACOES_URL}/${almoxarifadoId}`)
          this.data = resp.data
        } catch (error) {
          console.log(error)
        }
      }
    },
    limparForm() {
      this.almoxarifadoIdC = null
      this.produtoIdC = null
      this.tipoC = null
      this.quantidadeC = null
      this.obsC = null
    },
    async salvar() {
      try {
        await axios.post(`${import.meta.env.VITE_API_MOVIMENTACOES_URL}`, {
          id_produto: this.produtoIdC,
          id_almoxarifado: this.almoxarifadoIdC,
          tipo: this.tipoC,
          quantidade: this.quantidadeC,
          observacao: this.obsC
        })

        this.limparForm()
        await this.getData(this.almoxarifadoId)
      } catch (error) {
        console.log(error)
        alert(`Erro ao salvar. ${error.response.data.error}`)
      }
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<template>
  <h2>Movimentações</h2>
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
        <ComboboxProdutos v-model="produtoIdC" />
        <ComboboxAlmoxarifados v-model="almoxarifadoIdC" />
        <div class="form-group mb-3">
          <label for="inputGroupTipo">Tipo</label>
          <select class="form-select" id="inputGroupTipo" v-model="tipoC">
            <option value="" disabled>Escolha o tipo da movimentação</option>
            <option value="E">Entrada</option>
            <option value="S">Saída</option>
          </select>
        </div>
        <div class="form-group">
          <label for="inputQuantidade">Quantidade</label>
          <input type="number" step="any" min="0" class="form-control" v-model.number="quantidadeC" id="inputQuantidade" aria-describedby="quantidadeHelp" placeholder="Digite a quantidade movimentada">
          <small id="quantidadeHelp" class="form-text text-muted">Quantidade movimentada</small>
        </div>
        <div class="form-group">
          <label for="inputObs">Observação</label>
          <input type="text" class="form-control" v-model="obsC" id="inputObs" maxlength="255" aria-describedby="obsHelp" placeholder="Digite uma descrição">
          <small id="obsHelp" class="form-text text-muted">Observação sobre a movimentação</small>
        </div>
        <button type="submit" class="btn btn-primary me-2">Gravar</button>
        <button type="button" class="btn btn-secondary" @click="limparForm">Limpar</button>
      </form>
    </div>
    <div class="tab-pane fade table-responsive" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
      <ComboboxAlmoxarifados v-model="almoxarifadoId" />
      <ComboboxProdutos v-model="produtoId" />
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Almoxarifado</th>
            <th scope="col">Tipo</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Observação</th>
            <th scope="col">Data/Hora</th>
            <th scope="col">Categoria</th>
            <th scope="col">Código</th>
            <th scope="col">Produto</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="data && data.length > 0">
          <tr v-for="(movimentacao, index) in data" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ movimentacao.almoxarifado }}</td>
            <td>{{ movimentacao.tipo }}</td>
            <td>{{ movimentacao.quantidade }}</td>
            <td>{{ movimentacao.observacao }}</td>
            <td>{{ formatData(movimentacao.movimentacao) }}</td>
            <td>{{ movimentacao.categoria }}</td>
            <td>{{ movimentacao.codigo_produto }}</td>
            <td>{{ movimentacao.nome_produto }}</td>
          </tr>
          </template>
          <template v-else-if="data && data.length === 0 || data == undefined">
              <tr>
                <td colspan="9">
                  <LoadingSpinner mensagem="Sem dados a exibir" :comSpinner="false"/>
                </td>
              </tr>
          </template>
          <template v-else>
              <tr>
                <td colspan="9">
                  <LoadingSpinner />
                </td>
              </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
