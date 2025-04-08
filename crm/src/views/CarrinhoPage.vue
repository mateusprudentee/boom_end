<template>
  <div class="container" style="margin-top: 110px;">
    <div class="forum-layout">
      <div class="forum-main">
        <div class="forum">
          <div class="forum-card-post">
            <p>Seu Carrinho</p>
          </div>

          <div v-if="itensCarrinho.length === 0" class="topicos">
            <div class="flex">
              <div class="topicos-title">
                <P>Seu carrinho está vazio</P>
                <div class="topicos-subtitle">
                  <p>Continue explorando nossa loja para encontrar produtos incríveis!</p>
                </div>
              </div>
            </div>
          </div>

          <div v-for="(item, index) in itensCarrinho" :key="'item-'+index" class="topicos">
            <div class="flex">
              <div class="skin">
                <img :src="item.imagem" width="60" height="60" alt="[IMG]" style="border-radius: 10px; object-fit: cover;">
              </div>
              <div class="topicos-title">
                <P>{{ item.nome }}</P>
                <div class="topicos-subtitle">
                  <p>{{ item.descricao }}</p>
                </div>
                <div class="topicos-views">
                  <span style="color: red">R$</span> 
{{ formatarPreco(item.preco, item.desconto) }} 
<q-icon name="shopping_cart" color="red"></q-icon> 
Quantidade: {{ item.quantidade }}
                </div>
              </div>
              <div class="ultima-resposta-container">
                <div class="ultima-resposta">
                  <p>Subtotal</p>
                  <div class="ultima-resposta-pessoa">
                    <p>R$ {{ formatarPreco(item.preco, item.desconto) }}</p>
                  </div>
                </div>
                <div class="acoes-item" style="margin-top: 0; align-items: center;">
                  <q-btn flat dense icon="remove" color="red" @click="diminuirQuantidade(index)" size="sm" />
                  <q-btn flat dense icon="add" color="red" @click="aumentarQuantidade(index)" size="sm" />
                  <q-btn flat dense icon="delete" color="red" @click="removerItem(index)" size="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="forum-baixo" v-if="itensCarrinho.length > 0">
          <div class="forum-card-post">
            <p>Resumo do Pedido</p>
          </div>


          <!-- Seção do Cupom melhorada -->
          <div class="topicos-abaixo" style="padding: 15px;">

          </div>
          <div class="linha"></div>
          
          <div class="topicos-abaixo">
            <div class="flex">
              <div class="topicos-title-baixo">
                <P>Subtotal ({{ totalItens }} itens)</P>
              </div>
              <div class="ultima-resposta-container">
                <div class="ultima-resposta">
                  <p>R$ {{ formatarPreco(subtotal).replace('R$', '') }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="topicos-abaixo" style="padding-bottom: 20px;">
            <div class="flex">
              <div class="topicos-title-baixo" style="color: red; font-size: 18px;">
                <P>Total</P>
              </div>
              <div class="ultima-resposta-container">
                <div class="ultima-resposta" style="color: red; font-size: 18px; margin-bottom: 20px;">
                  <p>R$ {{ formatarPreco(total).replace('R$', '') }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="topicos-abaixo" style="padding-bottom: 10px;">
            <q-btn color="red" style="width: 100%;" label="Finalizar Compra" @click="finalizarCompra" />
          </div>
        </div>
      </div>
      <div class="topicos-abaixo" v-if="pagamentoPix" style="padding: 15px; text-align: center;">
        <div class="pix-payment-container">
          <h4 style="color: white; margin-bottom: 15px;">Pagamento via PIX</h4>
          
          <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
            <img 
              :src="pagamentoPix.qr_code_base64" 
              alt="QR Code PIX" 
              style="max-width: 200px; margin: 0 auto; display: block;"
            />
            
            <p style="color: white; margin: 15px 0; font-size: 16px;">
              Valor: <strong style="color: red;">R$ {{ formatarPreco(total) }}</strong>
            </p>
            
            <a 
              :href="pagamentoPix.ticket_url" 
              target="_blank"
              style="
                color: white;
                background: red;
                padding: 8px 15px;
                border-radius: 5px;
                text-decoration: none;
                display: inline-block;
                margin-top: 10px;
              "
            >
              <i class="material-icons" style="vertical-align: middle; font-size: 16px;">link</i> Pagar via PIX
            </a>
            
            <p style="color: #aaa; margin-top: 15px; font-size: 12px;">
              O pedido será confirmado automaticamente após o pagamento.
            </p>
          </div>
        </div>
      </div>

      <div class="forum-side">
        <div class="forum-baixo" style="margin-top: 0px;">
          <div class="forum-card-post">
            <p>Continue Comprando</p>
          </div>
          <div class="linha"></div>
          <div v-for="(produto, index) in produtosRecomendados" :key="'produto-'+index" class="topicos-abaixo" style="padding: 23px;">
            <div class="flex" style="align-items: center;">
              <div class="skin" style="margin-right: 15px;">
                <img :src="produto.imagem" width="40" height="40" alt="[IMG]" style="border-radius: 5px; object-fit: cover;">
              </div>
              <div class="topicos-title-baixo" style="flex: 1;">
                <P style="margin: 0; line-height: 1.2;">{{ produto.nome }}</P>
                <div class="topicos-subtitle" style="margin-top: 5px;">
                  <p style="margin: 0;">R$ {{ formatarPreco(produto.preco).replace('R$', '') }}</p>
                </div>
              </div>
              <div class="ultima-resposta-container" style="margin-top: -2px;">
                <q-btn flat dense icon="add_shopping_cart" color="red" @click="adicionarAoCarrinho(produto)" size="sm" style="font-size: 14px;"/>
              </div>
            </div>
          </div>
        </div>

        <!-- Seção de Termos de Uso expandida -->
        <div class="forum-baixo" style="margin-top: 20px;">
          <div class="forum-card-post">
            <p>Termos e Condições</p>
          </div>
          <div class="linha"></div>
          <div class="topicos-abaixo" style="padding-bottom: 20px;">
            <div style="text-align: left; font-size: 12px; color: gray; max-height: 200px; overflow-y: auto; padding-right: 10px;">
              <p style="font-weight: bold; color: white; margin-bottom: 10px;">Condições Gerais de Compra:</p>
              <p>1. Todos os produtos estão sujeitos a disponibilidade de estoque. Em caso de indisponibilidade, entraremos em contato para oferecer alternativas ou cancelamento do pedido.</p>
              <p>2. Os preços podem ser alterados sem aviso prévio, mas o valor confirmado no momento da compra será mantido.</p>
              <p>3. O prazo de entrega começa a contar a partir da confirmação do pagamento e está sujeito a variações conforme a região de entrega.</p>
              <p>4. Para devoluções, o produto deve estar na embalagem original, sem indícios de uso e acompanhado da nota fiscal.</p>
              <p>5. Garantias devem ser acionadas diretamente com o fabricante, conforme as políticas de cada marca.</p>
              <p style="font-weight: bold; color: white; margin-top: 15px; margin-bottom: 10px;">Política de Privacidade:</p>
              <p>1. Seus dados pessoais serão utilizados exclusivamente para processar seu pedido e melhorar sua experiência de compra.</p>
              <p>2. Não compartilhamos suas informações com terceiros sem sua autorização explícita.</p>
              <p>3. Utilizamos medidas de segurança para proteger seus dados contra acesso não autorizado.</p>
            </div>
            <q-btn 
              flat
              color="red" 
              style="width: 100%; margin-top: 15px;" 
              label="Ler Termos Completos" 
              @click="abrirTermos"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* (Estilos mantidos, com adição abaixo) */

.acoes-item {
  display: flex;
  gap: 5px;
  margin-top: 0;
  justify-content: flex-end;
  align-items: center;
}

.q-field--outlined .q-field__control {
  border-radius: 5px;
  background: white;
}

/* (Restante dos estilos mantido igual) */
</style>
<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'CarrinhoPage',
  setup() {
    const itensCarrinho = ref([]);
    const produtosRecomendados = ref([]);
    const loading = ref(false); // Indicador de carregamento
    const pagamentoPix = ref(null);

    // Configuração base do axios
    const api = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 10000
    });

    // Buscar itens do carrinho da API
    async function fetchCartItems() {
      try {
        loading.value = true; // Ativar o indicador de carregamento
        const response = await api.get('/carrinho');
        itensCarrinho.value = response.data.map(item => ({
          id: item.carrinho_id,
          produtoId: item.produto_id,
          nome: item.nome,
          descricao: item.descricao,
          preco: item.preco,
          quantidade: item.quantidade,
          imagem: item.imagem,
          desconto: item.desconto,
          tipo: item.tipo
        }));
      } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error);
        alert('Erro ao carregar carrinho: ' + error.message);
      } finally {
        loading.value = false; // Desativar o indicador de carregamento
      }
    }

    // Buscar produtos recomendados
    async function fetchRecommendedProducts() {
      try {
        const response = await api.get('/produtos', {
          params: {
            limit: 3
          }
        });
        produtosRecomendados.value = response.data.map(item => ({
          id: item.id,
          nome: item.nome,
          preco: item.valorAtual,
          imagem: item.imagem
        }));
      } catch (error) {
        console.error('Erro ao buscar produtos recomendados:', error);
        alert('Erro ao carregar produtos recomendados: ' + error.message);
      }
    }

    // Atualizar quantidade no carrinho
    async function updateQuantity(itemId, newQuantity) {
      try {
        await api.put(`/carrinho/${itemId}`, {
          quantidade: newQuantity
        });
      } catch (error) {
        console.error('Erro ao atualizar quantidade:', error);
        alert('Erro ao atualizar quantidade: ' + error.message);
        fetchCartItems(); // Recarrega os itens para sincronizar
      }
    }

    // Remover item do carrinho
    async function removeItem(itemId) {
      try {
        await api.delete(`/carrinho/${itemId}`);
        itensCarrinho.value = itensCarrinho.value.filter(item => item.id !== itemId);
        alert('Item removido do carrinho');
      } catch (error) {
        console.error('Erro ao remover item:', error);
        alert('Erro ao remover item do carrinho: ' + error.message);
      }
    }

    // Adicionar produto recomendado ao carrinho
    async function adicionarAoCarrinho(produto) {
      try {
        await api.post('/carrinho', {
          productId: produto.id,
          actionType: 'buy'
        });
        alert('Item adicionado ao carrinho');
        fetchCartItems(); // Atualiza a lista do carrinho
      } catch (error) {
        console.error('Erro ao adicionar item:', error);
        alert('Erro ao adicionar item ao carrinho: ' + error.message);
      }
    }

    // Funções auxiliares para manipulação do carrinho
    function aumentarQuantidade(index) {
      const newQuantity = itensCarrinho.value[index].quantidade + 1;
      itensCarrinho.value[index].quantidade = newQuantity;
      updateQuantity(itensCarrinho.value[index].id, newQuantity);
    }

    function diminuirQuantidade(index) {
      if (itensCarrinho.value[index].quantidade > 1) {
        const newQuantity = itensCarrinho.value[index].quantidade - 1;
        itensCarrinho.value[index].quantidade = newQuantity;
        updateQuantity(itensCarrinho.value[index].id, newQuantity);
      }
    }

    function removerItem(index) {
      removeItem(itensCarrinho.value[index].id);
    }

    // Cálculos computados
    const subtotal = computed(() => {
      return itensCarrinho.value.reduce((total, item) => {
        const precoComDesconto = item.preco * (1 - (item.desconto || 0) / 100);
        return total + (precoComDesconto * item.quantidade);
      }, 0);
    });

    const total = computed(() => subtotal.value);

    function formatarPreco(valor, desconto = 0) {
      const valorComDesconto = valor * (1 - desconto / 100);
      return valorComDesconto.toFixed(2).replace(".", ",");
    }

    const totalItens = computed(() => {
      return itensCarrinho.value.reduce((total, item) => {
        return total + item.quantidade;
      }, 0);
    });

    // Finalizar compra com PIX
    async function finalizarCompra() {
      try {
        loading.value = true; // Ativar o carregamento

        if (itensCarrinho.value.length === 0) {
          throw new Error('Seu carrinho está vazio');
        }

        const response = await api.post('/api/payments/pix', {
          email: 'cliente@email.com',
          amount: total.value,
          description: `Compra de ${itensCarrinho.value.length} itens`
        });

        if (!response.data.success) {
          throw new Error(response.data.message || 'Falha ao gerar pagamento');
        }

        pagamentoPix.value = {
          qr_code_base64: response.data.qr_code_base64,
          ticket_url: response.data.ticket_url
        };

        // Limpa o carrinho após sucesso
        await api.post('/carrinho/finalizar');
        itensCarrinho.value = [];

        alert('Pagamento PIX gerado com sucesso! Escaneie o QR Code para finalizar');

      } catch (error) {
        console.error('Erro no pagamento:', error);
        alert('Erro ao finalizar compra: ' + (error.message || 'Tente novamente mais tarde'));
      } finally {
        loading.value = false; // Desativar o carregamento
      }
    }

    // Carrega os dados quando o componente é montado
    onMounted(() => {
      fetchCartItems();
      fetchRecommendedProducts();
    });

    return { 
      itensCarrinho,
      produtosRecomendados,
      subtotal,
      total,
      totalItens,
      formatarPreco,
      aumentarQuantidade,
      diminuirQuantidade,
      removerItem,
      adicionarAoCarrinho,
      finalizarCompra,
      loading,
      pagamentoPix
    };
  }
}
</script>



  <style>
  .left-info {
    margin-bottom: -30px;
    text-align: left;
    padding: 0;
    margin-top: 0;
    color: gray;
    line-height: 10px;
    flex-grow: 1;
  }
  
  .acoes-item {
    display: flex;
    gap: 5px;
    margin-top: 0;
    justify-content: flex-end;
    align-items: center;
  }

  .q-field--outlined .q-field__control {
    border-radius: 5px;
    background: white;
  }
  
  .equipe-titulo {
    margin-top: -20px;
    color:gray;
    font-size: 15px;
    font-weight: normal;
  }
  .equipe-title {
    color: red;
    font-weight: bold;
    font-size: 17px;
  }
  .equipe-tipo {
    padding: 1em;
    text-align: left;
    padding-top: 0px;
    margin-top: -15px;
  }
  .publi-top {
    padding: 1em;
    margin-top: -30px;
  }
  .publi {
    width: 100%;
    height: 150px;
    background-image: url("https://yt3.googleusercontent.com/cfGdandwrxeJxd8fXLE3geAmWdTNxipDWjiZl0raED6O5GQ-2kIjHmCgNrQxtf4ygubqExSL=s900-c-k-c0x00ffffff-no-rj");
    background-position: center;
    background-size: cover;
    border-radius: 10px;
  }
  .topicos-title-baixo {
      color: rgb(184, 184, 184);
      font-weight: bold;
      flex-grow: 1;
      text-align: left;
      font-size: 16px;
  }
  .topicos-abaixo {
    padding: 1.5em;
    margin-top: -35px;
    padding-top: 0px;
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
  .ultima-resposta-container {
      margin-top: 20px;
  }
  .ultima-resposta-pessoa {
    color: rgba(128, 128, 128, 0.486);
    margin-top: -20px;
  }
  .pix-payment-container {
  margin-top: 20px;
  padding: 15px;
  background: rgba(128, 128, 128, 0.1);
  border-radius: 10px;
}

.pix-payment-container img {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px;
  background: white;
}
  .ultima-resposta {
    text-align: right;
    color: gray;
    padding-top: 0px;
    margin-top: 5px;
  }
  .topicos-views {
    margin-top: -15px;
    font-weight: normal;
    font-size: 11px;
    color: gray;
  }
  .topicos-subtitle {
    text-align: left;
    font-size: 12px;
    font-weight: normal;
    margin-top: -15px;
    color: gray;
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .topicos {
    padding: 1.5em;
    margin-top: -20px;
    padding-top: 0px;
  }
  .topicos-title {
    flex-grow: 1;
    text-align: left;
    font-size: 16px;
    color: rgb(207, 207, 207);
  }
  .ultima-resposta-container {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 150px;
  }
  .forum-card-post {
    font-size: 20px;
    text-align: left;
    padding: 1em;
    font-size: 21px;
    color: white;
  }
  .forum {
    width: 100%;
    border-radius: 20px;
    border: 1px solid rgba(128, 128, 128, 0.11);
    background: rgba(128, 128, 128, 0.055);
    padding-bottom: 20px;
  }
  
  .forum-layout {
    display: flex;
    gap: 20px;
    width: 100%;
  }
  
  .forum-main {
    width: 700px;
  }
  
  .forum-side {
    width: 350px;
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
  
  .stats-content {
    padding: 1.5em;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    color: rgb(207, 207, 207);
    font-size: 14px;
  }
  
  .pagina {
    background-color: #000;
    min-height: 100vh; 
    margin: 0;
    margin-top: -80px;
    padding: 130px 0 0 0; 
  }
  
  body {
    margin: 0;
    padding: 0;
    background-color: #000; 
  }
  </style>
  