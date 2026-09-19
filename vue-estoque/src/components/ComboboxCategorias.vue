<template>
  <div class="form-group mb-3">
    <label for="inputGroupCategorias">Categoria</label>
    <select class="form-select" id="inputGroupCategorias" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option value="" disabled>Escolha uma categoria</option>
      <template v-if="data">
        <option v-for="categoria in data" :key="categoria.id" :value="categoria.id">{{categoria.nome}}</option>
      </template>
    </select>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "CategoriasCombo",
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
        const resp = await axios.get(`${import.meta.env.VITE_API_CATEGORIAS_URL}`)
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
