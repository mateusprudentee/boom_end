<template>
  <div class="container">
    <div class="forum-layout">
      <div class="forum-main">
        <!-- Skeleton Loading -->
        <template v-if="loading">
          <div class="forum-baixo" style="height: 75px;">
            <div class="forum-card-post">
              <q-skeleton type="text" width="150px" class="skeleton-dark" />
            </div>
          </div>
          <div class="forum-baixo" style="margin-top: -10px">
            <div v-for="i in 5" :key="'skeleton-'+i" class="topicos-abaixo" style="margin-top: 10px;">
              <div class="flex">
                <div class="topicos-title-baixo">
                  <q-skeleton type="text" width="80%" class="skeleton-dark" />
                  <q-skeleton type="text" width="30%" class="skeleton-dark" />               

              </div>
                <div class="ultima-resposta-container">
                  <q-skeleton type="text" width="60px" class="skeleton-dark" />
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Conteúdo real -->
        <template v-else>
          
          <div class="forum-baixo" style="height: 75px;">
            
            <div class="flex">
            <div class="forum-card-post">
              <p>{{ category }}</p>
            </div>
            <q-btn 
      outline 
      color="orange" 
      label="NOVO TÓPICO" 
      @click="openNewTopicDialog"
      class="right-botao"
      style="margin-left: 1000px; margin-top: -110px;"
    />
    
    <q-dialog v-model="newTopicDialog">
      <NewTopic 
        @close="newTopicDialog = false"
        @created="handleTopicCreated"
      />
    </q-dialog>
              </div>
            
          </div>
          
          <div class="forum-baixo" style="margin-top: -10px">
            <div v-if="categoryTopics.length > 0" class="topicos-list" style="margin-top: 30px; margin-bottom: -25px;">
              <div v-for="(topic, index) in categoryTopics" :key="'topic-'+index" class="topicos-abaixo" @click="goToTopic(topic)">
                <div class="flex">
                  <div class="skin">
                    <img :src="topic.avatar" width="60" height="60" alt="Avatar" style="border-radius: 10px;">
                  </div>
                  <div class="topicos-title-baixo" style="margin-top: -10px;">
                    <p>{{ topic.title }}</p>
                    <div class="topicos-views">
  <q-icon name="chat"></q-icon> 
  {{ topic.replies }} {{ topic.replies === 1 ? 'resposta' : 'respostas' }}
  <q-icon name="visibility" style="margin-left: 8px;"></q-icon> 
  {{ topic.views }} {{ topic.views === 1 ? 'visualização' : 'visualizações' }}
</div>
                  </div>

                  <div class="ultima-resposta-container">
                    <div class="ultima-resposta">
                      <p>{{ topic.relative_time }}</p>
                    </div>
                  </div>
                  
                </div>
                
              </div>
            </div>
            <div v-else class="topicos-list" style="margin-top: 30px; margin-bottom: -25px;">
              <div class="topicos-abaixo">
                <p>Ainda não existem tópicos criados nesta categoria.</p>
              </div>
            </div>
          </div>
          <div class="sem-permissao">
              <p>Você não pode criar novos tópicos devido não estar logado.</p>
          </div>
        </template>
        
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import NewTopic from '../components/NewTopic.vue'

export default {
  name: 'ForumView',
  components: { NewTopic },
  props: ['category'],
  setup() {
    const newTopicDialog = ref(false)
    
    return {
      newTopicDialog
    }
  },
  data() {
    return {
      loading: true,
      categoryTopics: [],
      updateInterval: null,
      timeUpdateInterval: null
    }
  },
  created() {
    this.loadCategoryTopics();
    this.updateInterval = setInterval(() => {
      this.loadCategoryTopics();
    }, 60000);
    
    this.timeUpdateInterval = setInterval(() => {
      this.updateRelativeTimes();
    }, 60000);
  },
  beforeUnmount() {
    clearInterval(this.updateInterval);
    clearInterval(this.timeUpdateInterval);
  },
  methods: {
    async loadCategoryTopics() {
      this.loading = true;
      try {
        const response = await fetch(`http://localhost:3001/api/forum/topics/${encodeURIComponent(this.category)}`);
        if (!response.ok) throw new Error('Erro ao carregar tópicos');
        
        this.categoryTopics = await response.json();
      } catch (error) {
        console.error("Erro ao carregar tópicos:", error);
        this.categoryTopics = [];
      } finally {
        this.loading = false;
      }
    },
    
    async goToTopic(topic) {
      try {
        await fetch(`http://localhost:3001/api/forum/topic/${topic.id}/view`, {
          method: 'POST'
        });
      } catch (error) {
        console.error("Erro ao registrar visualização:", error);
      }
      
      this.$router.push({
        name: 'ForumTopic',
        params: {
          category: this.category,
          topic: topic.title,
        },
        query: {
          id: topic.id
        }
      });
    },
    
    handleTopicCreated(newTopic) {
      this.categoryTopics.unshift(newTopic);
      this.newTopicDialog = false;
    },
    
    updateRelativeTimes() {
      // Implementação da atualização de tempos
    },
    
    openNewTopicDialog() {
      this.newTopicDialog = true;
    }
  }
}
</script>
  <style scoped>
  .sem-permissao {
    margin-top: -5px;
    font-weight: normal;
    font-size: 14px;
    background:rgba(109, 109, 109, 0.048);
    padding: 1em;
    height: 50px;
    border-radius: 20px;
    border: 1px solid rgba(99, 98, 98, 0.048);
    color: gray;
    text-align: left;
  }
   .topicos-views {
    margin-top: -15px;
    font-weight: normal;
    font-size: 14px;
    color: gray;
  }
  .skeleton-dark {
    background-color: rgba(255, 255, 255, 0.1) !important;
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
    color: gray;
    cursor: pointer;
    margin-top: -10px;
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
    margin-top: 22px;
  }
  
  .ultima-resposta-pessoa {
    color: rgba(128, 128, 128, 0.486);
    margin-top: -20px;
  }
  
  .ultima-resposta {
    text-align: right;
    color: gray;
    padding-top: 0px;
    margin-top: 5px;
  }
  
  .flex {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .forum-card-post {
    font-size: 20px;
    text-align: left;
    padding: 1em;
    font-size: 21px;
    color: white;
  }
  
  .forum-layout {
    display: flex;
    gap: 20px;
    width: 100%;
  }
  
  .forum-main {
    width: 100%;
  }
  
  .container {
    width: 1150px;
    font-family: 'Ubuntu', sans-serif;
    margin: 0 auto;
    text-align: center;
    margin-top: 10px;
    background-color: #000;
    padding-bottom: 20px; 
  }
  
  body {
    margin: 0;
    padding: 0;
    background-color: #000; 
  }
  
  .skin {
    margin-right: 10px;
  }
  </style>