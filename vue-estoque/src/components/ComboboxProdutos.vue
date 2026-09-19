<template>
  <div class="form-group mb-3">
    <label for="inputGroupProdutos">Produto</label>
    <select class="form-select" id="inputGroupProdutos" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option value="" disabled>Escolha um produto</option>
      <template v-if="_data">
        <option v-for="produto in _data" :key="produto.id_produto" :value="produto.id_produto">{{produto.codigo}} | {{ produto.descricao }}</option>
      </template>
    </select>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "ProdutosCombo",
  props: {
    modelValue:{type: String, default: null }
  },
  emits:["update:modelValue"],
  components: {},
  data() {
    return { data: null }
  },
  computed:{
    _data(){
        if(!this.data) return []
        const vistos = new Set()
        return this.data.filter((produto) => {
            if(vistos.has(produto.id_produto)) return false
            vistos.add(produto.id_produto)
            return true
        })
    }
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
  },
  mounted() {
    this.getData()
  },
}
</script>

<style scoped>

</style>
