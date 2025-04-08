<template>
    <div class="container" style="margin-top: 110px;">
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
      })
      
      return {
        sortOptions,
        discountedItems,
        sortBy,
        openDetails,
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