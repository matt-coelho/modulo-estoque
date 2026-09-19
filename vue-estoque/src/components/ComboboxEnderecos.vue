<template>
  <div class="form-group mb-3">
    <label for="inputGroupEnderecos">Endereço</label>
    <select class="form-select" id="inputGroupEnderecos" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option value="" disabled>Escolha um endereço</option>
      <template v-if="data">
        <option v-for="endereco in data" :key="endereco.id" :value="endereco.id">{{endereco.logradouro}} {{ endereco.numero }} {{ endereco.bairro }} {{ endereco.cidade }}</option>
      </template>
    </select>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "EnderecosCombo",
  props: {
    modelValue:{type: String, default: null }
  },
  emits:["update:modelValue"],
  components: {},
  data() {
    return { data: null }
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
  },
  mounted() {
    this.getData()
  },
}
</script>

<style scoped>

</style>
