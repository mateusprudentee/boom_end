<template>
  <div class="container">
    <div class="forum-layout">
      <div class="forum-main">
        <!-- Skeleton Loading -->
        <template v-if="loading">
          <div class="subforum">
            <q-skeleton type="text" width="300px" height="30px" class="skeleton-dark" />
            <q-skeleton type="text" width="200px" height="20px" class="skeleton-dark" style="margin-top: -10px;" />
          </div>
          <div class="topic-container" style="margin-top: 20px;">
            <div class="left-side">
              <q-skeleton type="circle" size="80px" class="skeleton-dark" />
              <div class="user-info">
                <q-skeleton type="text" width="100px" class="skeleton-dark" />
                <q-skeleton type="text" width="80px" class="skeleton-dark" />
                <q-skeleton type="text" width="60px" class="skeleton-dark" />
              </div>
            </div>
            <div class="right-side">
              <q-skeleton type="rect" height="300px" class="skeleton-dark" />
            </div>
          </div>
        </template>

        <!-- Conteúdo real -->
        <template v-else>
          <div class="subforum">
            <div class="subforum-header">
              <div class="subforum-title">
                <p>{{ topicData.titulo }}</p>
              </div>
              <div class="subforum-link">
                <q-chip 
                  outline 
                  color="grey" 
                  text-color="rgb(107, 107, 107)"
                  clickable
                  @click="copyTopicLink"
                >
                  boom.me{{ formattedTopicLink }}
                </q-chip>
              </div>
            </div>
            <div class="subforum-subtitle">
              <p>Postado em '{{ topicData.categoria }}' em {{ formattedDate }}</p>
            </div>
          </div>

          <div class="topic-container">
            <div class="left-side">
              <img :src="topicData.avatar" :alt="topicData.autor" class="user-avatar">
              <div class="user-info">
                <p class="username">{{ topicData.autor }}</p>
                <p class="user-role">{{ topicData.autor_cargo }}</p>
                <div class="flex" style="padding: 1.5em; padding-top: 0px; margin-top: -50px; margin-bottom: -40px;">
                  <div class="left-info">
                    <p>Postagens</p>
                    <p>Troféus</p>
                    <p>Curtidas</p>
                  </div>
                  <div class="ultima-resposta-container" style="margin-top: 0;">
                    <div class="ultima-resposta" style="text-align: right; color: gray; padding-top: 0; margin-top: 0; line-height: 10px; margin-top: -56px; font-size: 13px;">
                      <p>{{ topicData.posts_autor }}</p>
                      <p>0</p>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="right-side">
              <div class="topic-content-wrapper">
                <div class="topic-text" v-if="topicData.content" v-html="topicData.content"></div>
                <div class="topic-text" v-else>
                  <p>Nenhum conteúdo disponível para este tópico.</p>
                </div>
                
                <div class="topic-stats">
                  <span><q-icon name="chat" /> {{ topicData.respostas }} respostas</span>
                  <span><q-icon name="visibility" /> {{ topicData.visualizacoes }} visualizações</span>
                  <span><q-icon name="schedule" /> {{ formattedDate }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="right-side-resposta">
            <div class="responder">
              <p>Responder</p>
            </div>
            <div class="campo-resposta">
              <!-- Área para inserir a resposta -->
            </div>
            <div class="botoes-resposta">
              <q-btn color="white" outline text-color="rgb(107, 107, 107)" label="COMENTAR"></q-btn>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForumTopic',
  props: ['id'],
  data() {
    return {
      loading: true,
      topicData: {
        titulo: '',
        avatar: '',
        categoria: '',
        visualizacoes: 0,
        autor: '',
        autor_cargo: '',
        respostas: 0,
        content: '',
        posts_autor: 0,
        criado_em: ''
      }
    }
  },
  computed: {
    formattedTopicLink() {
      if (!this.topicData.titulo || !this.topicData.categoria) return '';
      
      const formattedCategory = encodeURIComponent(
        this.topicData.categoria.replace(/\s+/g, '-').toLowerCase()
      );
      
      const formattedTitle = encodeURIComponent(
        this.topicData.titulo.replace(/\s+/g, '-').toLowerCase()
      );
      
      return `/forum/view/${formattedCategory}/${formattedTitle}?id=${this.id}`;
    },
    formattedDate() {
      if (!this.topicData.criado_em) return '';
      const date = new Date(this.topicData.criado_em);
      return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
  },
  created() {
    this.loadTopicData();
  },
  methods: {
    async loadTopicData() {
      this.loading = true;
      try {
        if (!this.id) {
          throw new Error('ID do tópico não fornecido');
        }
        
        const response = await fetch(`http://localhost:3001/api/forum/topic/${this.id}`);
        if (!response.ok) throw new Error('Erro ao carregar tópico');
        
        const data = await response.json();
        this.topicData = {
          titulo: data.titulo || 'Sem título',
          avatar: data.avatar || '',
          categoria: data.categoria || 'Sem categoria',
          visualizacoes: data.visualizacoes || 0,
          autor: data.autor || 'Anônimo',
          autor_cargo: data.autor_cargo || 'Membro',
          respostas: data.respostas || 0,
          content: data.content || 'Nenhum conteúdo disponível',
          posts_autor: data.posts_autor || 0,
          criado_em: data.criado_em || new Date().toISOString()
        };
        
        // Registrar visualização
        await fetch(`http://localhost:3001/api/forum/topic/${this.id}/view`, {
          method: 'POST'
        });
        
      } catch (error) {
        console.error('Erro ao carregar tópico:', error);
        this.$q.notify({
          message: 'Erro ao carregar tópico',
          color: 'negative',
          position: 'top'
        });
      } finally {
        this.loading = false;
      }
    },
    copyTopicLink() {
      const linkToCopy = `boom.me${this.formattedTopicLink}`;
      navigator.clipboard.writeText(linkToCopy)
        .then(() => {
          this.$q.notify({
            message: 'Link copiado!',
            color: 'positive',
            position: 'top',
            timeout: 1000
          });
        })
        .catch(err => {
          console.error('Falha ao copiar link:', err);
          this.$q.notify({
            message: 'Erro ao copiar link',
            color: 'negative',
            position: 'top'
          });
        });
    }
  },
  watch: {
    id() {
      this.loadTopicData();
    }
  }
};
</script>
<style scoped>
.botoes-resposta {
  align-items: right;
  justify-content: right;
  align-self: right;
  align-items: right;
  margin-top: 20px;
  color: rgb(107, 107, 107);

  display: flex;
  flex-direction: row;
  gap: 10px;
}
.campo-resposta {
  width: 100%;
  min-height: 200px;
  background: rgb(20, 20, 20);
  border-radius: 8px;
}
.left-info {
    margin-bottom: -30px;
    text-align: left;
    padding: 0;
    margin-top: 60px;
    font-size: 12px;
    color: gray;
    line-height: 10px;
    flex-grow: 1;
  }
  
.ultima-resposta-container {
      margin-top: 20px;
  }
  .ultima-resposta-pessoa {
    color: rgba(128, 128, 128, 0.486);
    margin-top: -20px;
  }
  .ultima-resposta {
    text-align: right;
    color: gray;
    padding-top: 0;
    margin-top: 5px;
  }
  .topicos-views {
    margin-top: -15px;
    font-weight: normal;
    font-size: 11px;
    color: gray;
  }
.subforum-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.subforum-link {
  margin-left: 20px;
}
.subforum-subtitle {
  margin-top: -17px;
  color: gray;
  font-size: 17px;
}
.subforum-title {
  font-weight: bold;
  font-size: 20.5px;
}
.subforum {
  text-align: left;
  color: white;
  margin-top: 40px;
}
.container {
  width: 1150px;
  font-family: 'Ubuntu', sans-serif;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #000;
  padding-bottom: 20px;
}

.forum-layout {
  display: flex;
  gap: 20px;
  width: 100%;
}

.forum-main {
  width: 100%;
}

.topic-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.left-side {
  width: 200px;
  background: rgba(128, 128, 128, 0.055);
  border-radius: 20px;
  border: 1px solid rgba(128, 128, 128, 0.11);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start; /* Faz com que o left-side não estique */
}

.user-avatar {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.user-info {
  text-align: center;
  font-size: 20px;
  color: rgb(184, 184, 184);
}

.username {
  font-weight: bold;
  margin: 5px 0;
}

.post-count {
  color: gray;
  font-size: 13px;
  margin: 5px 0;
}
.responder {
  color: rgb(161, 161, 161);
  font-weight: bold;
  font-size: 17px;
  text-align: left;
}
.right-side-resposta {
  margin-top: 10px;
  width: 940px;
  justify-content: right;
  align-items: right;
  margin-left: 210px;
  background: rgba(128, 128, 128, 0.055);
  border-radius: 20px;
  border: 1px solid rgba(128, 128, 128, 0.11);
  padding: 20px;
}
.right-side {
  flex: 1;
  background: rgba(128, 128, 128, 0.055);
  border-radius: 20px;
  border: 1px solid rgba(128, 128, 128, 0.11);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.topic-content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.topic-text {
  color: rgb(184, 184, 184);
  text-align: left;
  line-height: 1.6;
  flex-grow: 1;
}

.topic-text >>> p {
  margin: 10px 0;
}

.topic-text >>> ul {
  margin: 10px 0;
  padding-left: 20px;
}

.topic-stats {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  color: gray;
  font-size: 12px;
  display: flex;
  gap: 15px;
}

.topic-stats span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.skeleton-dark {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-radius: 10px;
}
</style>