<template>
    <!-- Componente principal da aplicação -->
    <div id="app">
      <!-- Navbar fixo no topo -->
      <Navbar />
      
      <!-- Conteúdo principal das páginas (irá mudar conforme a rota) -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
  import Navbar from './components/Navbar.vue'
  
  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
  </script>
  
  <style>
  /* Estilos globais */
  #app {
    font-family: 'Ubuntu', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    flex: 1;
    margin-top: -10px; /* Ajuste conforme a altura do seu navbar */
    padding: 20px;
  }
  </style>