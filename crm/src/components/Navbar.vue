<template>
  <header id="cabecalhoPrincipal" class="cabecalho">
    <section class="cabecalho-conteudo">
      <div class="cabecalho-logo">
        <a class="cabecalho-link" href="/">
        </a>
      </div>
      
      <div class="cabecalho-menu">
        <a class="cabecalho-item" href="/">
          <q-icon name="home" size="1.5rem" />
          <span>Início</span>
        </a>

        <a class="cabecalho-item" href="/reels">
          <q-icon name="camera_alt" size="1.5rem" />
          <span>Reels</span>
        </a>
        
        <a class="cabecalho-item" href="/loja">
          <q-icon name="store" size="1.5rem" />
          <span>Loja</span>
        </a>

        
        <a class="cabecalho-item" href="/forum">
          <q-icon name="chat" size="1.5rem" />
          <span>Fórum</span>
        </a>

        <a class="cabecalho-item" href="/punicoes">
          <q-icon name="gavel" size="1.5rem" />
          <span>Punições</span>
        </a>
        
        <a class="cabecalho-item" href="/carrinho">
          <q-icon name="attach_money" size="1.5rem" />
          <span>Carrinho</span>
        </a>

      </div>
      
      <div class="cabecalho-usuario">
        <div class="dropdown-wrapper">
          <button 
            class="usuario-botao"
            @click="toggleDropdown('perfil')"
          >
            <div class="usuario-avatar">M</div>
            <div class="usuario-nome">Mateus</div>
            <q-icon 
              :name="activeDropdown === 'perfil' ? 'expand_less' : 'expand_more'" 
              size="1.25rem" 
              class="usuario-icone" 
            />
          </button>
          <div 
            class="usuario-menu"
            :class="{ 'dropdown-active': activeDropdown === 'perfil' }"
          >
            <a class="usuario-menu-item" href="/perfil">
              <q-icon name="person" size="1.5rem" />
              <span>Perfil</span>
            </a>
            <a class="usuario-menu-item" href="/logout">
              <q-icon name="logout" size="1.5rem" />
              <span>Sair</span>
            </a>
          </div>
          
        </div>
        
      </div>
      
    </section>
    <div class="cabecalho-efeito"></div>
  </header>
  <div class="conteudo-principal">
    
      <router-view />
  </div>

</template>
<style scoped>
.container {
  width: 1150px;
  font-family: 'Ubuntu', sans-serif;
  margin: 0 auto;
  text-align: center;
}
/* Importação da fonte Ubuntu */
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
.conteudo-principal {
  margin-top: 80px; /* Ajuste conforme a altura do seu navbar */
}
/* Estilos base */
.cabecalho {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(128, 128, 128, 0.151);
  animation: deslizarDeCima 0.3s ease-out;
  font-family: 'Ubuntu', sans-serif;
}

.cabecalho-conteudo {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 1170px;
  min-height: 5rem;
  justify-content: space-between;
}

.cabecalho-logo {
  width: 45px;
  background-image: url("https://i.imgur.com/WQY7JuX.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 50px;
}

.cabecalho-link {
  cursor: pointer;
  text-decoration: none;
}

.cabecalho-titulo {
  width: 70%;
  color: white;
  margin-left: 50px;
  font-size: 1.5rem;
  font-weight: bold;
}

.cabecalho-menu {
  width: 60%;
  display: flex;
  justify-content: center;
}

.cabecalho-item {
  font-weight: normal;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 100%;
  padding: 1.75rem 1.5rem;
  transition: all 0.3s;
  color: #a1a1aa;
  text-decoration: none;
  background: none;
  border: none;
  position: relative;
}

.cabecalho-item:hover {
  color: white;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
  margin-left: 0.5rem;
}

/* Dropdown */
.dropdown-wrapper {
  position: relative;
}

.dropdown-conteudo {
  display: none;
  width: 100%;
  position: absolute;
  left: 0;
  top: 100%;
  background-color: #1e1e1e;
  padding: 0 2.5rem;
  overflow: hidden;
  height: fit-content;
  cursor: default;
  margin-top: 0;
  transition: all 0.3s ease-out;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.dropdown-active {
  display: flex;
  justify-content: center;
  padding: 2.5rem 2.5rem;
  opacity: 1;
  pointer-events: auto;
}

.dropdown-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem 0.5rem;
  max-width: 1170px;
  row-gap: 2.5rem;
  width: 100%;
}

.dropdown-item {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.dropdown-link {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 1.25rem;
  align-items: center;
  text-decoration: none;
  padding: 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.dropdown-link:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.dropdown-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  height: 4rem;
  min-width: 4rem;
  background-color: #2d2d2d;
  padding: 0 1.25rem;
  transition: all 0.3s;
  color: #a1a1aa;
}

.dropdown-link:hover .dropdown-icone {
  background-color: #3b82f6;
  color: #f8fafc;
}

.dropdown-texto {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
  text-align: left;
}

.dropdown-titulo {
  color: #f8fafc;
  font-weight: 500;
  font-size: 0.875rem;
}

.dropdown-descricao {
  color: #86888e;
  font-size: 0.75rem;
  padding-right: 2.5rem;
}

/* Usuário */
.cabecalho-usuario {
  width: 20%;
  display: flex;
  justify-content: flex-end;
}

.usuario-botao {
  z-index: 12;
  display: flex;
  width: 100%;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.usuario-botao:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.usuario-avatar {
  border-radius: 9999px;
  background-color: white;
  width: 1.75rem;
  height: 1.75rem;
  font-size: 1rem;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
}

.usuario-nome {
  font-weight: normal;
  font-size: 0.875rem;
  color: #a1a1aa;
}

.usuario-icone {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #a1a1aa;
}

.usuario-menu {
  position: absolute;
  right: 0;
  top: 120%;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  transform: translateX(0);
  background-color: #1e1e1e;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  display: none;
  z-index: 20;
}

.usuario-menu.dropdown-active {
  display: block;
}

.usuario-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-weight: normal;
  font-size: 0.875rem;
  color: #a1a1aa;
  text-decoration: none;
  border-radius: 4px;
}

.usuario-menu-item:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

/* Efeitos */
.cabecalho-efeito {
  z-index: -1;
  pointer-events: none;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  opacity: 1,3;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
  height: 80px;
}

/* Animação */
@keyframes deslizarDeCima {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsividade para dropdowns com muitas colunas */
@media (max-width: 1200px) {
  .dropdown-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dropdown-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LayoutPrincipal',
  setup() {
    const activeDropdown = ref(null)

    const toggleDropdown = (dropdown) => {
      activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown
    }

    return {
      activeDropdown,
      toggleDropdown
    }
  }
})
</script>
