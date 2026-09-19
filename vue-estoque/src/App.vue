<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">
        <img src="/favicon-estoque.svg" alt="Bootstrap" width="30" height="24">
      </RouterLink>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/categorias" class="nav-link">Categorias</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/produtos" class="nav-link">Produtos</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/enderecos" class="nav-link">Endereços</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/almoxarifados" class="nav-link">Almoxarifados</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/movimentacoes" class="nav-link">Movimentações</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped></style>