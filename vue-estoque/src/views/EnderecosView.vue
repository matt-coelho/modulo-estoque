<template>
  <h2>Endereço</h2>
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
          <label for="inputLogradouro">Logradouro</label>
          <input type="text" class="form-control" v-model="logradouro" id="inputLogradouro" placeholder="Digite o nome do logradouro">
        </div>
        <div class="form-group">
          <label for="inputNumero">Número</label>
          <input type="text" class="form-control" v-model="numero" id="inputNumero" placeholder="Digite o número">
        </div>
        <div class="form-group">
          <label for="inputComplemento">Complemento</label>
          <input type="text" class="form-control" v-model="complemento" id="inputComplemento" placeholder="Digite um complemento">
        </div>
        <div class="form-group">
          <label for="inputBairro">Bairro</label>
          <input type="text" class="form-control" v-model="bairro" id="inputBairro" placeholder="Digite o bairro">
        </div>
        <div class="form-group">
          <label for="inputCidade">Cidade</label>
          <input type="text" class="form-control" v-model="cidade" id="inputCidade" placeholder="Digite a cidade">
        </div>
        <div class="form-group">
          <label for="inputCodigoPostal">Código Postal</label>
          <input type="text" class="form-control" v-model="codigo_postal" id="inputCodigoPostal" placeholder="Digite o código postal">
        </div>
        <div class="form-group mb-3">
          <label for="inputReferencia">Referência</label>
          <input type="text" class="form-control" v-model="referencia" id="inputReferencia" placeholder="Digite uma referência">
        </div>
        <button type="submit" class="btn btn-primary me-2">{{ idEdicao ? "Atualizar" : "Cadastrar" }}</button>
        <button type="button" class="btn btn-secondary" @click="limparForm">Limpar</button>
      </form>
    </div>
    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Logradouro</th>
            <th scope="col">Número</th>
            <th scope="col">Bairro</th>
            <th scope="col">Cidade</th>
            <th scope="col">Código Postal</th>
            <th scope="col">Referência</th>
            <th scope="col">Complemento</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
          <tbody>
            <template v-if="data && data.length > 0">
            <tr v-for="(endereco, index) in data" :key="endereco.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ endereco.logradouro }}</td>
              <td>{{ endereco.numero }}</td>
              <td>{{ endereco.bairro }}</td>
              <td>{{ endereco.cidade }}</td>
              <td>{{ endereco.codigo_postal }}</td>
              <td>{{ endereco.referencia }}</td>
              <td>{{ endereco.complemento }}</td>
              <td>
                <AcoesListagem :entidade="endereco" @editar="editar" @clonar="clonar" @remover="remover" />
              </td>
            </tr>
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
          </tbody>
        </table>
    </div>
  </div>
</template>

<style>

</style>

<script>
import axios from "axios"
import AcoesListagem from "../components/AcoesListagem.vue"
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  name: "EnderecosView",
  components: {
    AcoesListagem,
    LoadingSpinner
  },
  data() {
    return { data: null, idEdicao: null, logradouro: null, numero: null, complemento: null, bairro: null, cidade: null, codigo_postal: null, referencia: null }
  },
  methods: {
    async getData() {
      try {
        const resp = await axios.get(`${import.meta.env.VITE_API_ENDERECOS_URL}`)
        this.data = resp.data
      } catch (error) {
        console.log(error)
      }
    },
    async remover(id) {
      if (!confirm("Tem certeza que deseja remover este item?")) return
      let resp
      try {
        resp = await axios.delete(`${import.meta.env.VITE_API_ENDERECOS_URL}/${id}`)
        if(resp.status == 200 || resp.status == 204){
          this.data = this.data.filter((endereco) => endereco.id !== id)
        }
        //await this.getData()
      } catch (error) {
        alert(`Não foi possível remover o endereço, ele pode estar associado a um almoxarifado. ${error.message}`)      
      }
    },
    editar(entidade) {
      this.idEdicao = entidade.id
      this.logradouro = entidade.logradouro
      this.numero = entidade.numero
      this.complemento = entidade.complemento
      this.bairro = entidade.bairro
      this.cidade = entidade.cidade
      this.codigo_postal = entidade.codigo_postal
      this.referencia = entidade.referencia
    },
    clonar(entidade){
      this.editar(entidade)
      this.idEdicao = null
    },
    limparForm() {
      this.idEdicao = null
      this.logradouro = null
      this.numero = null
      this.complemento = null
      this.bairro = null
      this.cidade = null
      this.codigo_postal = null
      this.referencia = null
    },
    async salvar() {
      try {
        if (this.idEdicao) {
          await axios.put(`${import.meta.env.VITE_API_ENDERECOS_URL}`, {
            id: this.idEdicao,
            logradouro: this.logradouro,
            numero: this.numero,
            complemento: this.complemento,
            bairro: this.bairro,
            cidade: this.cidade,
            codigo_postal: this.codigo_postal,
            referencia: this.referencia
          })
        } else {
          await axios.post(`${import.meta.env.VITE_API_ENDERECOS_URL}`, {
            logradouro: this.logradouro,
            numero: this.numero,
            complemento: this.complemento,
            bairro: this.bairro,
            cidade: this.cidade,
            codigo_postal: this.codigo_postal,
            referencia: this.referencia
          })
        }

        this.limparForm()
        await this.getData()
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