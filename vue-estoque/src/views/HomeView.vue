<script>
import CardResumoEstoque from "../components/CardResumoEstoque.vue"
import AcordeonHomeView from "../components/AcordeonHomeView.vue";

export default {
  name: "HomeView",
  components: {
    CardResumoEstoque,
    AcordeonHomeView
  },
  data() {
    return {}
  },
  watch:{},
  methods: {},
  mounted() {},
}
</script>

<template>
  <div class="py-4">
    <CardResumoEstoque />
    <AcordeonHomeView />
  </div>
</template>