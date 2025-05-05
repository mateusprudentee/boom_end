<template>
   <!-- Elemento Épico com Últimos Compradores -->
    <div class="container">
   <div class="epic-element">
        <div class="ia-icon"></div>
        <h2 class="epic-title">TORNE-SE BOOM</h2>
        <p class="epic-subtitle">Experimente a Inteligência Artificial de modo avançado</p>
        
        <div class="compradores-container">
          <h3 class="compradores-title">ÚLTIMOS COMPRADORES</h3>
          <div class="compradores-grid">
            <div v-for="(comprador, index) in ultimosCompradores" :key="index" class="comprador">
              <span class="vip-comprado" :class="comprador.vipClass"><strong>{{ comprador.tag }}</strong></span> 
              <strong :style="{ color: comprador.corTag }">{{ comprador.nome }}</strong>
              <span class="tempo-compra">{{ comprador.tempo }}</span>
            </div>
          </div>
        </div>

        <div class="particles">
          <div class="particle" v-for="i in 15" :key="i"></div>
        </div>
      </div>
</div>
    <div class="container" style="margin-top: -60px;">
      <div class="shop-layout">
     
     
        <!-- Itens da loja -->
        <div class="shop-items">
          <div class="forum-baixo">
            <div class="forum-card-post">
              <div class="flex justify-between items-center">
                <q-skeleton v-if="loading" type="text" width="200px" height="30px" animation="fade" dark />
                <p v-else>Pacotes em Promoção</p>
                <div>
                  <q-skeleton v-if="loading" type="rect" width="200px" height="40px" animation="fade" dark />
                  <q-select v-else
                    outlined 
                    v-model="sortBy" 
                    :options="sortOptions" 
                    label="Ordenar por" 
                    dense 
                    style="width: 200px;"
                    dark
                    bg-color="rgba(128, 128, 128, 0.055)"
                    dropdown-icon="expand_more"
                  />
                </div>
              </div>
            </div>
            <div class="linha"></div>
            
            <div class="items-grid">
              <template v-if="loading">
                <div v-for="i in 3" :key="'skeleton-'+i" class="item-card">
                  <q-skeleton type="rect" width="100%" height="180px" animation="fade" dark />
                  <div class="item-details">
                    <div class="item-price">
                      <q-skeleton type="text" width="80px" animation="fade" dark />
                      <q-skeleton type="text" width="60px" animation="fade" dark />
                    </div>
                    <div class="action-buttons" style="justify-content: right;">
                      <q-skeleton type="circle" width="30px" height="30px" animation="fade" dark />
                      <q-skeleton type="rect" width="100px" height="30px" animation="fade" dark />
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div v-for="(item, index) in discountedItems" :key="'item-'+index" class="item-card">
                  <div class="item-image">
                    <img :src="item.image" :alt="item.name">
                    <div class="item-badge">
                      -{{ item.discount }}%
                    </div>
                  </div>
                  <div class="item-details">
                    <span class="item-name">{{ item.name }}</span>
                    <div class="item-price">
                      <span class="original-price">R$ {{ item.price.toFixed(2) }}</span>
                      <span class="final-price">R$ {{ getFinalPrice(item) }}</span>
                    </div>
                    <div class="action-buttons" style="justify-content: right;">
                        <button class="gift-button-info" @click="openDetails(item)">
                        <q-icon name="info" size="sm" />
                      </button>
                        <button class="gift-button" @click="addToCart(item, 'gift')">
                        <q-icon name="card_giftcard" size="sm" />
                      </button>
                      <button class="buy-button" @click="addToCart(item, 'buy')">
                        <q-icon name="add_shopping_cart" size="sm" />
                        <span>Comprar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="detailsDialog" maximized>
    <DetailsVip 
      :item="selectedItem" 
      @close="detailsDialog = false"
    />
  </q-dialog>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useQuasar } from 'quasar'
  import DetailsVip from '../components/DetailsVip.vue'
  
  export default {
    name: 'LojaPage',
    components: { DetailsVip },
    setup() {
      const ultimosCompradores = [
      { tag: "GOLD", nome: "ReaperXZ", corTag: "#FFD700", vip: "GOLD", vipClass: "Gold", tempo: "há 1 minuto" },
      { tag: "RUBY", nome: "NotchBR", corTag: "#4169E1", vip: "RUBY", vipClass: "Ruby", tempo: "há 3 minutos" },
      { tag: "BOOM", nome: "Zumbi42", corTag: "#B22222", vip: "BOOM", vipClass: "Boom", tempo: "há 5 minutos" },
      { tag: "GOLD", nome: "Creeper", corTag: "#FFD700", vip: "GOLD", vipClass: "Gold", tempo: "há 8 minutos" },
      { tag: "BOOM", nome: "Herobrine", corTag: "#B22222", vip: "BOOM", vipClass: "Boom", tempo: "há 12 minutos" },
      { tag: "RUBY", nome: "Enderman", corTag: "#4169E1", vip: "RUBY", vipClass: "Ruby", tempo: "há 15 minutos" },
      { tag: "GOLD", nome: "Steve", corTag: "#FFD700", vip: "GOLD", vipClass: "Gold", tempo: "há 18 minutos" },
      { tag: "RUBY", nome: "Alex", corTag: "#4169E1", vip: "RUBY", vipClass: "Ruby", tempo: "há 22 minutos" },
      { tag: "BOOM", nome: "Skeleton", corTag: "#B22222", vip: "BOOM", vipClass: "Boom", tempo: "há 25 minutos" }
    ];

      const $q = useQuasar()
      const router = useRouter()
      const sortOptions = [
        { label: 'Maior desconto', value: 'discount-desc' },
        { label: 'Preço: menor primeiro', value: 'price-asc' },
        { label: 'Preço: maior primeiro', value: 'price-desc' }
      ]
      
      const items = ref([])
      const sortBy = ref('discount-desc')
      const loading = ref(true)
      const detailsDialog = ref(false)
      const selectedItem = ref(null)
  
      // Buscar produtos da API
      async function fetchProducts() {
        try {
          const response = await fetch('http://localhost:3000/produtos')
          const data = await response.json()
          items.value = data.map(item => ({
            id: item.id,
            name: item.nome,
            price: item.valorAtual,
            discount: item.descontoAtual,
            description: item.descricao,
            image: item.imagem,
            originalPrice: item.ultimoValor || item.valorAtual,
            hasCoupon: item.cupomAtivo
          }))
        } catch (error) {
          console.error('Erro ao buscar produtos:', error)
          $q.notify({
            type: 'negative',
            message: 'Erro ao carregar produtos da loja'
          })
        } finally {
          loading.value = false
        }
      }
  
      // Adicionar ao carrinho
      async function addToCart(item, actionType) {
        try {
          const response = await fetch('http://localhost:3000/carrinho', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              productId: item.id,
              actionType: actionType // 'buy' ou 'gift'
            })
          })
          
          if (response.ok) {
            router.push('/carrinho')
          } else {
            throw new Error('Erro ao adicionar ao carrinho')
          }
        } catch (error) {
          console.error('Erro:', error)
          $q.notify({
            type: 'negative',
            message: 'Erro ao adicionar item ao carrinho'
          })
        }
      }
  
      function getFinalPrice(item) {
        return (item.price * (1 - item.discount / 100)).toFixed(2)
      }
  
      function openDetails(item) {
        selectedItem.value = item
        detailsDialog.value = true
      }
  
      const discountedItems = computed(() => {
        const result = items.value.filter(item => item.discount > 0)
        
        switch (sortBy.value) {
          case 'price-asc':
            return result.sort((a, b) => getFinalPrice(a) - getFinalPrice(b))
          case 'price-desc':
            return result.sort((a, b) => getFinalPrice(b) - getFinalPrice(a))
          default:
            return result.sort((a, b) => b.discount - a.discount)
        }
      })
  
      onMounted(() => {
        fetchProducts()
        const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        const tx = (Math.random() - 0.5) * 500;
        const ty = (Math.random() - 0.5) * 500;
        const delay = Math.random() * 5;
        const size = Math.random() * 10 + 5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${delay}s`;
      });
    });

      
      return {
        sortOptions,
        discountedItems,
        sortBy,
        openDetails,
        ultimosCompradores,
        detailsDialog,
        selectedItem,
        addToCart,
        loading,
        getFinalPrice
      }
    }
  }
  </script>
  
  <style>
.pagina {
  background-color: #000;
  min-height: 100vh; 
  margin: 0;
  margin-top: -80px;
  padding: 130px 0 0 0; 
  font-family: 'Ubuntu', sans-serif;
}

.container {
  width: 1150px;
  margin: 0 auto;
  text-align: center;
  background-color: #000;
  padding-bottom: 20px; 
}

/* Banner Principal */
.tudo {
  border-radius: 20px;
  border: 1px solid rgba(128, 128, 128, 0.13);
  margin-bottom: 40px;
}

.imagem {
  position: relative;
  background-image: url("https://i.imgur.com/kkiSA1V.png");
  width: 100%;
  height: 500px;
  box-shadow: inset 1px -370px 590px black;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.card-bottom {
  margin-top: 349px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.438);
  box-shadow: 1px -10px 679px black;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: center;
}

button {
  background: rgb(104, 0, 0);
  border: 1px solid rgb(190, 0, 0);
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  border-radius: 10px;
  margin-top: 10px;
  transition: all 0.3s ease;
}

button:hover {
  background: rgb(102, 0, 0);
  transform: translateY(-2px);
}

.vip {
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.vip-desc {
  font-size: 17px;
  margin-top: -18px;
  color: #ccc;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Seção Destaque IA */
.ia-destaque {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  border: 1px solid rgba(255, 85, 85, 0.3);
  position: relative;
  overflow: hidden;
}

.ia-destaque::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #ff0000, #ff6600, #ff0000);
  animation: gradientFlow 3s infinite linear;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.ia-destaque-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ia-destaque-text {
  flex: 1;
  text-align: left;
}

.ia-destaque h2 {
  font-size: 36px;
  color: white;
  margin-bottom: 15px;
}

.destaque {
  color: #ff5555;
  text-shadow: 0 0 10px rgba(255, 85, 85, 0.5);
}

.ia-destaque p {
  color: #aaa;
  font-size: 18px;
  margin-bottom: 25px;
}

.ia-stats {
  display: flex;
  gap: 30px;
}

.stat {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px 25px;
  border-radius: 10px;
  border-left: 3px solid #ff5555;
}

.stat-number {
  color: #ff5555;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  color: #ccc;
  font-size: 14px;
}

.ia-destaque-icon {
  width: 150px;
  height: 150px;
  position: relative;
}

.hexagon {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff0000, #a70000);
  clip-path: polygon(
    50% 0%,
    90% 25%,
    90% 75%,
    50% 100%,
    10% 75%,
    10% 25%
  );
  animation: rotate 15s infinite linear;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Seção SkyBlock */
.skyblock-section {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  border: 1px solid rgba(0, 150, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 100, 255, 0.1);
}

.skyblock-header {
  margin-bottom: 30px;
}

.skyblock-header h2 {
  font-size: 36px;
  color: white;
  margin-bottom: 10px;
}

.edition {
  color: #00aaff;
  text-shadow: 0 0 10px rgba(0, 170, 255, 0.5);
}

.skyblock-header p {
  color: #aaa;
  font-size: 18px;
}

.skyblock-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 30px;
}

.feature {
  background: rgba(0, 0, 0, 0.4);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid rgba(0, 150, 255, 0.1);
  transition: all 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 100, 255, 0.2);
  border-color: rgba(0, 150, 255, 0.3);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.feature h3 {
  color: #00aaff;
  margin-bottom: 15px;
  font-size: 20px;
}

.feature p {
  color: #aaa;
  font-size: 15px;
}

.skyblock-button {
  background: linear-gradient(90deg, #0066ff, #00aaff);
  border: none;
  padding: 15px 40px;
  font-size: 18px;
  margin-top: 20px;
}

.skyblock-button:hover {
  background: linear-gradient(90deg, #0055dd, #0099ff);
  transform: translateY(-2px);
}

/* Seção Vantagens VIP */
.vantagens-section {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
}

.vantagens-section h2 {
  font-size: 36px;
  color: white;
  margin-bottom: 30px;
}

.vip-text {
  color: #ff5555;
  text-shadow: 0 0 10px rgba(255, 85, 85, 0.5);
}

.vantagens-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.vantagem {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
}

.vantagem:hover {
  transform: translateY(-5px);
}

.vantagem-header {
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.vantagem h3 {
  font-size: 24px;
  margin-bottom: 5px;
}

.preco {
  color: #ffcc00;
  font-weight: bold;
  font-size: 18px;
}

.beneficios {
  list-style: none;
  padding: 0;
  text-align: left;
}

.beneficios li {
  color: #ccc;
  margin-bottom: 10px;
  position: relative;
  padding-left: 20px;
}

.beneficios li::before {
  content: "✓";
  color: #ff5555;
  position: absolute;
  left: 0;
}

.gold {
  border-top: 3px solid #FFD700;
}

.ruby {
  border-top: 3px solid #4169E1;
}

.boom {
  border-top: 3px solid #ff5555;
}

/* Seção Torneio */
.torneio-section {
  background: linear-gradient(135deg, #000000 0%, #420101 100%);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.torneio-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  z-index: 1;
}

.torneio-content {
  position: relative;
  z-index: 2;
}

.torneio-section h2 {
  font-size: 36px;
  color: white;
  margin-bottom: 30px;
}

.premio {
  color: #ffcc00;
  text-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
}

.torneio-info {
  display: flex;
  gap: 40px;
}

.torneio-details {
  flex: 1;
  text-align: left;
}

.torneio-details h3 {
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.torneio-details p {
  color: #aaa;
  font-size: 16px;
  margin-bottom: 20px;
}

.premiacao {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.premiacao li {
  color: #ccc;
  margin-bottom: 10px;
  font-size: 18px;
}

.posicao {
  color: #ffcc00;
  font-weight: bold;
  margin-right: 10px;
}

.inscrever-button {
  background: linear-gradient(90deg, #ff0000, #ff6600);
  border: none;
  padding: 15px 40px;
  font-size: 18px;
}

.inscrever-button:hover {
  background: linear-gradient(90deg, #cc0000, #ff5500);
}

.torneio-timer {
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 15px;
  min-width: 300px;
}

.timer-title {
  color: #ff5555;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
}

.timer {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.timer-block {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  min-width: 80px;
}

.timer-number {
  color: white;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
}

.timer-label {
  color: #aaa;
  font-size: 14px;
}

/* Elemento Épico */
.epic-element {
  position: relative;
  padding: 50px;
  margin: 50px 0;
  border-radius: 20px;
  background: linear-gradient(135deg, #0c0c0c 0%, #000 100%);
  overflow: hidden;
  text-align: center;
}

.ia-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: linear-gradient(45deg, #ff0000, #a70000);
  clip-path: polygon(
    50% 0%,
    60% 40%,
    100% 50%,
    60% 60%,
    50% 100%,
    40% 60%,
    0% 50%,
    40% 40%
  );
  animation: pulse 2s infinite alternate;
  filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.7));
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.1); opacity: 1; }
}

.epic-title {
  font-size: 46px;
  font-weight: bold;
  background: linear-gradient(90deg, #ff3d3d, #960000);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: 'Ubuntu', sans-serif;
  -webkit-text-fill-color: transparent;
  margin-bottom: 5px;
  text-shadow: 0 2px 10px rgba(255, 85, 85, 0.3);
}

.epic-subtitle {
  color: #ffffff73;
  font-size: 18px;
  margin-top: -5px;
  margin-bottom: 30px;
}

/* Container dos Compradores */
.compradores-container {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 25px;
  margin: 30px auto;
  max-width: 900px;
  border: 1px solid rgba(255, 85, 85, 0.3);
}

.compradores-title {
  color: #ff5555;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.compradores-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.comprador {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  font-size: 16px;
  text-align: left;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(5px);
}

.comprador:hover {
  transform: translateX(5px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(255, 85, 85, 0.2);
}

.vip-comprado {
  margin-right: 8px;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 4px;
}

.Gold {
  color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
}

.Ruby {
  color: #4169E1;
  background: rgba(65, 105, 225, 0.1);
}

.Boom {
  color: #B22222;
  background: rgba(178, 34, 34, 0.1);
}

.tempo-compra {
  position: absolute;
  right: 15px;
  bottom: 5px;
  font-size: 12px;
  color: #666;
}

/* Partículas */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: #ff5555;
  border-radius: 50%;
  opacity: 0;
  animation: particle-anim 5s infinite;
}

@keyframes particle-anim {
  0% { 
    transform: translate(0, 0); 
    opacity: 0;
    width: 0;
    height: 0;
  }
  10% { 
    opacity: 1;
    width: 5px;
    height: 5px;
  }
  100% { 
    transform: translate(var(--tx), var(--ty)); 
    opacity: 0;
    width: 0;
    height: 0;
  }
}

/* Footer */
.footer-card {
  width:100%;
  padding: 1em;
  color: rgba(255, 255, 255, 0.575);
  margin-top: 50px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: #ffffff07;
}

.footer-opcoes {
  display: flex;
  gap: 10px;
  text-align: center;
  padding: 0.4em;
  margin: 0 auto;
  align-items: center;
  font-size: 13px;
  color: rgba(128, 128, 128, 0.5);
  justify-content: center;
  flex-wrap: wrap;
}
  .item-name {
    color:#8b0000;
    font-weight: bold;
    font-size: 25px;
  }
  .shop-layout {
    display: flex;
    gap: 20px;
    width: 100%;
  }
  
  .shop-items {
    flex-grow: 1;
    width: 100%;
  }
  
  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 1em;
    padding-top: 0;
    margin-top: -15px;
  }
  
  .item-card {
    border-radius: 10px;
    overflow: hidden;
    background: rgba(128, 128, 128, 0.055);
    border: 1px solid rgba(128, 128, 128, 0.11);
    transition: all 0.3s ease;
    position: relative;
  }
  
  .item-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 0, 0, 0.1);
    border-color: rgba(255, 0, 0, 0.3);
  }
  
  .item-image {
    position: relative;
    height: 180px;
    overflow: hidden;
  }
  
  .item-image img {
    width: 100%;
    height: 100%;
    padding: 1.3em;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .item-card:hover .item-image img {
    transform: scale(1.05);
  }
  
  .item-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ff2222;
    color: white;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
    z-index: 1;
  }
  
  .item-details {
    padding: 15px;
  }
  
  .item-price {
    color: red;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .original-price {
    text-decoration: line-through;
    color: gray;
    font-size: 14px;
    margin-right: 8px;
  }
  
  .final-price {
    font-size: 20px;
  }
  
  .action-buttons {
    display: flex;
    gap: 8px;
  }
  .gift-button-info {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(61, 61, 61, 0.2);
    border: 1px solid rgba(71, 71, 71, 0.3);
    border-radius: 20px;
    padding: 8px 12px;
    color: rgb(138, 138, 138);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .gift-button, .buy-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 0, 0, 0.2);
    border: 1px solid rgba(255, 0, 0, 0.3);
    border-radius: 20px;
    padding: 8px 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .gift-button {
    padding: 8px;
  }
  
  .buy-button {
    padding: 8px 15px;
  }
  
  .buy-button span {
    margin-left: 6px;
    font-size: 14px;
  }
  
  .gift-button:hover, .buy-button:hover {
    background: rgba(255, 0, 0, 0.3);
  }
  
  .forum-card-post {
    font-size: 20px;
    text-align: left;
    padding: 1em;
    font-size: 21px;
    color: white;
  }
  
  .linha {
    width: 100%;
    margin-bottom: 35px;
    margin-top: -20px;
    height: 1px;
    background: rgba(128, 128, 128, 0.048);
  }
  
  .forum-baixo {
    width: 100%;
    margin-top: 20px;
    border-radius: 20px;
    border: 1px solid rgba(128, 128, 128, 0.11);
    background: rgba(128, 128, 128, 0.055);
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  
  .flex {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .container {
    width: 1150px;
    font-family: 'Ubuntu', sans-serif;
    margin: 0 auto;
    text-align: center;
    margin-top: 130px;
    background-color: #000;
    padding-bottom: 20px; 
  }
  
  body {
    margin: 0;
    padding: 0;
    background-color: #000; 
  }
  
  /* Estilos personalizados para os skeletons */
  .q-skeleton--dark {
    background: rgba(128, 128, 128, 0.2) !important;
  }
  .q-skeleton--dark:after {
    background: linear-gradient(90deg, rgba(128, 128, 128, 0) 0%, rgba(128, 128, 128, 0.3) 50%, rgba(128, 128, 128, 0) 100%) !important;
  }
  </style>