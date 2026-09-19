import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/CategoriasView.vue'),
    },
    {
      path: '/movimentacoes',
      name: 'movimentacoes',
      component: () => import('../views/MovimentacoesView.vue'),
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: () => import('../views/ProdutosView.vue'),
    },
    {
      path: '/enderecos',
      name: 'enderecos',
      component: () => import('../views/EnderecosView.vue'),
    },
    {
      path: '/almoxarifados',
      name: 'almoxarifados',
      component: () => import('../views/AlmoxarifadosView.vue'),
    },
  ],
})

export default router
