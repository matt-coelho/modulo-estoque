<script>
  import axios from "axios"
  import EnderecosCombo from '../components/ComboboxEnderecos.vue'
  import AcoesListagem from "../components/AcoesListagem.vue"
  import LoadingSpinner from "../components/LoadingSpinner.vue";

  export default {
  name: "AlmoxarifadosView",
  components: {
    EnderecosCombo,
    AcoesListagem,
    LoadingSpinner
  },
  data() {
    return { data: null, idEndereco: null, idEdicao: null, nomeAlmoxarifado: null }
  },
  methods: {
    async getData() {
      try {
        const resp = await axios.get(`${import.meta.env.VITE_API_ALMOXARIFADOS_URL}`)
        this.data = resp.data
      } catch (error) {
        console.log(error)
      }
    },
    async remover(id) {
      if (!confirm("Tem certeza que deseja remover este item?")) return
      let resp
      try {
        resp = await axios.delete(`${import.meta.env.VITE_API_ALMOXARIFADOS_URL}/${id}`)
        if(resp.status == 200 || resp.status == 204){
          this.data = this.data.filter((almoxarifado) => almoxarifado.id !== id)
        }
        //await this.getData()
      } catch (error) {
        alert(`Não foi possível remover o almoxarifado. Podem existir movimentações associadas. ${error.message}`)
      }
    },
    editar(entidade) {
      this.idEndereco = entidade.id_endereco
      this.idEdicao = entidade.id
      this.nomeAlmoxarifado = entidade.nome
    },
    clonar(entidade){
      this.editar(entidade)
      this.idEdicao = null
    },
    limparForm() {
      this.idEdicao = null
      this.idEndereco = null
      this.nomeAlmoxarifado = null
    },
    async salvar() {
      try {
        if (this.idEdicao) {
          await axios.put(`${import.meta.env.VITE_API_ALMOXARIFADOS_URL}`, {
            nome: this.nomeAlmoxarifado,
            id: this.idEdicao,
            id_endereco: this.idEndereco
          })
        } else {
          await axios.post(`${import.meta.env.VITE_API_ALMOXARIFADOS_URL}`, {
            nome: this.nomeAlmoxarifado,
            id_endereco: this.idEndereco
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
  <h2>Almoxarifado</h2>
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
          <label for="inputNomeAlmoxarifado">Nome almoxarifado</label>
          <input type="text" class="form-control" v-model="nomeAlmoxarifado" id="inputNomeAlmoxarifado" aria-describedby="nomeAlmoxarifadoHelp" placeholder="Digite o nome do almoxarifado">
          <small id="nomeAlmoxarifadoHelp" class="form-text text-muted">Nomeie o almoxarifado</small>
        </div>
        <EnderecosCombo v-model="idEndereco" />
        <button type="submit" class="btn btn-primary me-2">{{ idEdicao ? "Atualizar" : "Cadastrar" }}</button>
        <button type="button" class="btn btn-secondary" @click="limparForm">Limpar</button>
      </form>
    </div>
    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
          <tbody>
            <template v-if="data && data.length > 0">
            <tr v-for="(almoxarifado, index) in data" :key="almoxarifado.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ almoxarifado.nome }}</td>
              <td>
                <AcoesListagem :entidade="almoxarifado" @editar="editar" @clonar="clonar" @remover="remover" />
              </td>
            </tr>
            </template>
            <template v-else-if="data && data.length === 0">
                <tr>
                  <td colspan="2">
                    <LoadingSpinner mensagem="Sem dados a exibir" :comSpinner="false"/>
                  </td>
                </tr>
            </template>
            <template v-else>
                <tr>
                  <td colspan="2">
                    <LoadingSpinner />
                  </td>
                </tr>
            </template>
          </tbody>
        </table>
    </div>
  </div>
</template>

<style>

</style>
