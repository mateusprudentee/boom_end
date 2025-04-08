<template>
    <div class="details-shop-container">
      <div class="details-header">
        <h2>{{ item.name }}</h2>
        <q-icon name="close" class="close-icon" @click="$emit('close')" />
      </div>
  
      <div class="details-content">
        <div class="item-image">
          <img :src="item.image" :alt="item.name">
          <div class="item-badge" v-if="item.discount">
            -{{ item.discount }}%
          </div>
        </div>
  
        <div class="price-section">
          <div class="original-price" v-if="item.discount">
            R$ {{ item.price.toFixed(2) }}
          </div>
          <div class="final-price">
            R$ {{ getFinalPrice(item) }}
          </div>
        </div>
  
        <div class="action-section">
          <q-radio 
            v-model="actionType" 
            val="buy" 
            label="Comprar para mim" 
            :disable="initialAction === 'gift'"
          />
          <q-radio 
            v-model="actionType" 
            val="gift" 
            label="Presentear alguém" 
            :disable="initialAction === 'buy'"
          />
  
          <div class="gift-fields" v-if="actionType === 'gift'">
            <q-input
              outlined
              v-model="giftRecipient"
              label="Nome do destinatário"
              dark
              bg-color="rgba(128, 128, 128, 0.055)"
              :rules="[val => !!val || 'Campo obrigatório']"
            />
            <q-input
              outlined
              v-model="giftMessage"
              label="Mensagem (opcional)"
              dark
              bg-color="rgba(128, 128, 128, 0.055)"
              type="textarea"
              rows="3"
            />
          </div>
        </div>
  
        <div class="benefits-section">
          <h3>Benefícios deste VIP:</h3>
          <ul>
            <li v-for="(benefit, index) in item.benefits" :key="index">
              <q-icon name="check" /> {{ benefit }}
            </li>
          </ul>
        </div>
  
        <div class="total-section">
          <span>Total:</span>
          <span class="total-price">R$ {{ getFinalPrice(item) }}</span>
        </div>
  
        <q-btn
          class="confirm-button"
          @click="handleConfirm"
          label="Finalizar Compra"
          unelevated
          no-caps
          :loading="loading"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'DetailsShop',
    props: {
      item: {
        type: Object,
        required: true
      },
      initialAction: {
        type: String,
        default: 'buy'
      }
    },
    setup(props, { emit }) {
      const router = useRouter()
      const actionType = ref(props.initialAction)
      const giftRecipient = ref('')
      const giftMessage = ref('')
      const loading = ref(false)
  
      function getFinalPrice(item) {
        return (item.price * (1 - (item.discount || 0) / 100)).toFixed(2)
      }
  
      function handleConfirm() {
        if (actionType.value === 'gift' && !giftRecipient.value) {
          return
        }
  
        loading.value = true
  
        const purchaseData = {
          item: {
            id: props.item.id,
            name: props.item.name,
            price: props.item.price,
            finalPrice: getFinalPrice(props.item),
            image: props.item.image
          },
          type: actionType.value
        }
  
        if (actionType.value === 'gift') {
          purchaseData.giftData = {
            recipient: giftRecipient.value,
            message: giftMessage.value
          }
        }
  
        // Simula processamento
        setTimeout(() => {
          console.log('Compra realizada:', purchaseData)
          loading.value = false
          router.push('/carrinho')
          emit('close')
        }, 1500)
      }
  
      return {
        actionType,
        giftRecipient,
        giftMessage,
        loading,
        getFinalPrice,
        handleConfirm
      }
    }
  }
  </script>
  
  <style scoped>
  .details-shop-container {
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100vh;
    background: rgba(20, 20, 20, 0.95);
    border-left: 1px solid rgba(255, 0, 0, 0.2);
    z-index: 10000;
    padding: 20px;
    color: white;
    overflow-y: auto;
  }
  
  .details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  }
  
  .details-header h2 {
    margin: 0;
    color: #8b0000;
    font-size: 24px;
  }
  
  .close-icon {
    cursor: pointer;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.2s;
  }
  
  .close-icon:hover {
    color: white;
  }
  
  .item-image {
    position: relative;
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
  
  .price-section {
    margin: 20px 0;
    padding: 15px;
    background: rgba(128, 128, 128, 0.055);
    border-radius: 10px;
  }
  
  .original-price {
    text-decoration: line-through;
    color: gray;
    font-size: 16px;
  }
  
  .final-price {
    font-size: 24px;
    font-weight: bold;
    color: white;
  }
  
  .action-section {
    margin: 25px 0;
  }
  
  .action-section .q-radio {
    margin-bottom: 15px;
  }
  
  .action-section .q-radio:deep(.q-radio__label) {
    color: white;
    margin-left: 8px;
  }
  
  .gift-fields {
    margin-top: 15px;
    padding: 15px;
    background: rgba(128, 128, 128, 0.055);
    border-radius: 10px;
  }
  
  .gift-fields .q-input {
    margin-bottom: 15px;
  }
  
  .benefits-section {
    margin: 25px 0;
    padding: 15px;
    background: rgba(128, 128, 128, 0.055);
    border-radius: 10px;
  }
  
  .benefits-section h3 {
    margin-top: 0;
    color: #8b0000;
  }
  
  .benefits-section ul {
    padding-left: 20px;
  }
  
  .benefits-section li {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
  
  .benefits-section li .q-icon {
    color: #8b0000;
    margin-right: 8px;
  }
  
  .total-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px 0;
    padding: 15px;
    background: rgba(128, 128, 128, 0.055);
    border-radius: 10px;
    font-size: 18px;
  }
  
  .total-price {
    font-weight: bold;
    color: white;
    font-size: 22px;
  }
  
  .confirm-button {
    width: 100%;
    background: rgba(255, 0, 0, 0.3);
    color: white;
    font-weight: bold;
    padding: 12px;
    border-radius: 10px;
    transition: background 0.3s;
  }
  
  .confirm-button:hover {
    background: rgba(255, 0, 0, 0.4);
  }
  </style>