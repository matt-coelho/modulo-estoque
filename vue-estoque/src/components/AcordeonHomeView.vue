<template>
  <div class="accordion py-4" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        <strong>Custo de Venda de Estoque concentrado por Almoxarifado</strong>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
      <div class="accordion-body">
        <table class="table table table-sm">
            <thead>
                <tr>
                    <th scope="col">Almoxarifado</th>
                    <th scope="col">Qtd. Produtos</th>
                    <th scope="col">Qtd. Itens</th>
                    <th scope="col">Custo Total</th>
                    <th scope="col">Vl. Venda Total</th>
                    <th scope="col">Margem</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="dtCVEstoque && dtCVEstoque.length > 0">
                <tr v-for="(resumo, index) in dtCVEstoque" :key="index">
                    <td>{{ resumo.almoxarifado }}</td>
                    <td>{{ Number(resumo.qtd_produtos) }}</td>
                    <td>{{ Number(resumo.qtd_itens) }}</td>
                    <td>{{ formatNumeric(resumo.vl_total_custo) }}</td>
                    <td>{{ formatNumeric(resumo.vl_total_venda) }}</td>
                    <td>{{ formatNumeric(resumo.margem) }}</td>
                </tr>
                </template>
                <template v-else-if="dtCVEstoque && dtCVEstoque.length === 0">
                    <tr>
                      <td colspan="6">
                        <LoadingSpinner mensagem="Sem dados a exibir" :comSpinner="false"/>
                      </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                      <td colspan="6">
                        <LoadingSpinner />
                      </td>
                    </tr>
                </template>
            </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
        <strong>Produtos com maior Valor em Estoque</strong>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show">
      <div class="accordion-body">
        <table class="table table table-sm">
            <thead>
                <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Qtd. Total</th>
                    <th scope="col">Vl. Total Custo</th>
                    <th scope="col">Vl. Total Venda</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="dtVLEstoque && dtVLEstoque.length > 0">
                <tr v-for="(resumo, index) in dtVLEstoque" :key="index">
                    <td>{{ resumo.codigo }}</td>
                    <td>{{ resumo.descricao }}</td>
                    <td>{{ resumo.categoria }}</td>
                    <td>{{ Number(resumo.qtd_total) }}</td>
                    <td>{{ formatNumeric(resumo.vl_total_custo) }}</td>
                    <td>{{ formatNumeric(resumo.vl_total_venda) }}</td>
                </tr>
                </template>
                <template v-else-if="dtVLEstoque && dtVLEstoque.length === 0">
                    <tr>
                      <td colspan="6">
                        <LoadingSpinner mensagem="Sem dados a exibir" :comSpinner="false"/>
                      </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                      <td colspan="6">
                        <LoadingSpinner />
                      </td>
                    </tr>
                </template>
            </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
        <strong>Resumo por Categoria</strong>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show">
      <div class="accordion-body">
        <table class="table table table-sm">
            <thead>
                <tr>
                    <th scope="col">Categoria</th>
                    <th scope="col">Qtd. Produtos</th>
                    <th scope="col">Qtd. Itens</th>
                    <th scope="col">Custo Total</th>
                    <th scope="col">Vl. Venda Total</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="dtCategorias && dtCategorias.length > 0">
                <tr v-for="(resumo, index) in dtCategorias" :key="index">
                    <td>{{ resumo.categoria }}</td>
                    <td>{{ Number(resumo.qtd_produtos) }}</td>
                    <td>{{ Number(resumo.qtd_itens) }}</td>
                    <td>{{ formatNumeric(resumo.vl_total_custo) }}</td>
                    <td>{{ formatNumeric(resumo.vl_total_venda) }}</td>
                </tr>
                </template>
                <template v-else-if="dtCategorias && dtCategorias.length === 0">
                    <tr>
                      <td colspan="5">
                        <LoadingSpinner mensagem="Sem dados a exibir" :comSpinner="false"/>
                      </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                      <td colspan="5">
                        <LoadingSpinner />
                      </td>
                    </tr>
                </template>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios"
import { formatNumeric } from "./utils.js";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  name: "AcordeonHomeView",
  components: { LoadingSpinner },
  data() {
    return { dtCVEstoque: null, dtVLEstoque: null, dtCategorias: null }
  },
  watch:{},
  methods: {
    formatNumeric,
    async getDataCVE() {
        try {
            const resp = await axios.get(`${import.meta.env.VITE_API_MOV_RES_CON_URL}`)
            this.dtCVEstoque = resp.data
        } catch (error) {
            console.log(error)
        }
    },
    async getDataPVE() {
        try {
            const resp = await axios.get(`${import.meta.env.VITE_API_MOV_RES_PROD_URL}`)
            this.dtVLEstoque = resp.data
        } catch (error) {
            console.log(error)
        }
    },
    async getDataRE() {
        try {
            const resp = await axios.get(`${import.meta.env.VITE_API_MOV_CATEGORIA_URL}`)
            this.dtCategorias = resp.data
        } catch (error) {
            console.log(error)
        }
    },
  },
  mounted() {
    this.getDataCVE()
    this.getDataPVE()
    this.getDataRE()
  },
}
</script>

<style></style>