<template>
    <div class="card text-center mb-3">
        <div class="card-header">
            Resumo geral de estoque
        </div>
        <div class="card-body table-responsive ">
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">Qtd. Produtos</th>
                        <th scope="col">Qtd. Almoxarifados</th>
                        <th scope="col">Qtd. Itens</th>
                        <th scope="col">Custo Total</th>
                        <th scope="col">Vl. Venda Total</th>
                        <th scope="col">Margem Potencial</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="data && data.length > 0">
                    <tr v-for="(resumo, index) in data" :key="index">
                        <td>{{ Number(resumo.qtd_produtos) }}</td>
                        <td>{{ Number(resumo.qtd_almoxarifados) }}</td>
                        <td>{{ Number(resumo.qtd_itens) }}</td>
                        <td>{{ formatNumeric(resumo.vl_total_custo) }}</td>
                        <td>{{ formatNumeric(resumo.vl_total_venda) }}</td>
                        <td>{{ formatNumeric(resumo.margem) }}</td>
                    </tr>
                    </template>
                    <template v-else-if="data && data.length === 0">
                        <LoadingSpinner mensagem="Sem dados a exibir" :comSpinner="false"/>
                    </template>
                    <template v-else>
                        <LoadingSpinner />
                    </template>
                </tbody>
            </table>
        </div>
        <div class="card-footer text-body-secondary">
            {{ formatData(agora) }}
        </div>
    </div>
</template>

<script>
import axios from "axios"
import { formatNumeric, formatData } from "./utils.js";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  name: "CardResumoEstoque",
  components: { LoadingSpinner },
  data() {
    return { data: null, agora: Date.now() }
  },
  watch:{},
  methods: {
    formatNumeric,
    formatData,
    async getData() {
        try {
            const resp = await axios.get(`${import.meta.env.VITE_API_MOV_RES_GERAL_URL}`)
            this.data = resp.data
        } catch (error) {
            console.log(error)
        }
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style scoped></style>