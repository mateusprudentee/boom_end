<template>
    <div class="details-container">
      <div class="dialog-header">
        <h2><b>{{ item.name }}</b></h2>
        <q-btn 
          icon="close" 
          flat 
          round 
          dense 
          @click="$emit('close')" 
          class="close-button"
        />
      </div>
      
      <div class="details-content">
        <div class="item-image-container">
          <img :src="item.image" :alt="item.name" class="item-image-large">
          <div class="item-badge-large">
            -{{ item.discount }}%
          </div>
        </div>
        
        <div class="item-info">
          <div class="price-section">
            <span class="original-price">De: R$ {{ item.price.toFixed(2) }}</span>
            <span class="final-price">Por: R$ {{ finalPrice }}</span>
            <span class="economy">Economize R$ {{ economy }}</span>
          </div>
          
          <div class="description-section">
            <h3 style="margin-top: -10px;">Descrição</h3>
            <div class="linha" style="margin-bottom: 10px;"></div>
            <p>Este pacote VIP oferece benefícios exclusivos para melhorar sua experiência no servidor.</p>
            <ul class="benefits-list">
              <li><q-icon name="check" /> Tag VIP no chat</li>
              <li><q-icon name="check" /> Acesso a canais exclusivos</li>
              <li><q-icon name="check" /> Comandos especiais</li>
              <li><q-icon name="check" /> Prioridade em suporte</li>
              <li><q-icon name="check" /> 10% de bônus na Mineração</li>
              <li><q-icon name="check" /> 3 cupons semestrais</li>
            </ul>
          </div>
          
          <div class="action-buttons">
            <button class="gift-button" @click="handleGift">
              <q-icon name="card_giftcard" size="sm" />
              Presentear
            </button>
            <button class="buy-button" @click="handleBuy">
              <q-icon name="add_shopping_cart" size="sm" />
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'DetailsVip',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    setup(props) {
        const router = useRouter()
      
      function handleGift() {
          router.push('/carrinho')
      }
      function handleBuy() {
        router.push('/carrinho')
      }
      const finalPrice = computed(() => {
        return (props.item.price * (1 - props.item.discount / 100)).toFixed(2)
      })
      
      const economy = computed(() => {
        return (props.item.price - finalPrice.value).toFixed(2)
      })
      
      return {
        finalPrice,
        economy,
        handleBuy,
        handleGift
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilos permanecem exatamente os mesmos */
  .details-container {
    background: #0f0f0f;
    color: white;
    height: 700px;
    padding: 20px;
    width: 900px;
    font-family: 'Ubuntu', sans-serif;
  }
  
  .dialog-header {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
  }
  
  .dialog-header h2 {
    margin: 0;
    font-size: 24px;
    color: #8b0000;
    flex-grow: 1;
    text-align: center;
  }
  
  .close-button {
    color: white;
  }
  
  .details-content {
    display: flex;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .item-image-container {
    flex: 1;
    position: relative;
  }
  
  .item-image-large {
    width: 100%;
    max-height: 500px;
    object-fit: contain;
    border-radius: 10px;
    border: 1px solid rgba(128, 128, 128, 0.2);
  }
  
  .item-badge-large {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #ff2222;
    color: white;
    padding: 8px 15px;
    border-radius: 15px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .price-section {
    background: rgba(128, 128, 128, 0.1);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
  }
  
  .original-price {
    display: block;
    text-decoration: line-through;
    color: gray;
    font-size: 18px;
  }
  
  .final-price {
    display: block;
    font-size: 28px;
    margin-top: -10px;
    color: #ff2222;
    font-weight: bold;

  }
  
  .economy {
    display: block;
    color: #4e4e4e;
    font-size: 13px;
    margin-top: -5px;
  }
  
  .description-section {
    margin-bottom: 30px;
    color: gray;
    background: rgb(22, 22, 22);
    padding: 1em;
    border-radius: 20px;
  }
  
  .description-section h3 {
    color: #8b0000;
    font-size: 20px;
    margin-bottom: 15px;
  }
  
  .description-section p {
    margin-bottom: 20px;
    line-height: 1.5;
  }
  
  .benefits-list {
    list-style: none;
    padding: 0;
    line-height: 5px;
  }
  
  .benefits-list li {
    padding: 8px 0;
    display: flex;
    align-items: center;
  }
  
  .benefits-list li .q-icon {
    color: #4CAF50;
    margin-right: 10px;
  }
  
  .action-buttons {
    display: flex;
    gap: 15px;
    margin-top: auto;
  }
  
  .gift-button, .buy-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    font-size: 16px;
  }
  
  .gift-button {
    background: rgba(255, 0, 0, 0.2);
    color: white;
    border: 1px solid rgba(255, 0, 0, 0.3);
  }
  
  .buy-button {
    background: rgba(255, 0, 0, 0.5);
    color: white;
    border: 1px solid rgba(255, 0, 0, 0.6);
    flex-grow: 1;
  }
  
  .gift-button:hover {
    background: rgba(255, 0, 0, 0.3);
  }
  
  .buy-button:hover {
    background: rgba(255, 0, 0, 0.6);
  }
  
  .gift-button .q-icon, .buy-button .q-icon {
    margin-right: 8px;
  }
  
  @media (max-width: 768px) {
    .details-content {
      flex-direction: column;
    }
  }
  </style>