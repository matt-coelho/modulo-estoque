<template>
  <div class="form-group mb-3">
    <label for="inputGroupAlmoxarifados">Almoxarifado</label>
    <select class="form-select" id="inputGroupAlmoxarifados" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option value="" disabled>Escolha um almoxarifado</option>
      <template v-if="data">
        <option v-for="almoxarifado in data" :key="almoxarifado.id" :value="almoxarifado.id">{{almoxarifado.nome}}</option>
      </template>
    </select>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "AlmoxarifadosCombo",
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
        const resp = await axios.get(`${import.meta.env.VITE_API_ALMOXARIFADOS_URL}`)
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
