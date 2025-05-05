<template>
  <div class="container" style="margin-top: 110px;">
    <div class="forum-layout">
      <div class="forum-main">
        <!-- Skeleton para Tópicos Recentes -->
        <div class="forum" v-if="loading">
          <div class="forum-card-post">
            <q-skeleton type="text" width="150px" class="skeleton-dark" />
          </div>
          <div v-for="i in 5" :key="'recentes-skeleton-'+i" class="topicos">
            <div class="flex">
              <div class="skin">
                <q-skeleton type="circle" width="60px" height="60px" class="skeleton-dark" />
              </div>
              <div class="topicos-title" style="width: 100%">
                <q-skeleton type="text" width="80%" class="skeleton-dark" />
                <q-skeleton type="text" width="50%" class="skeleton-dark" />
                <q-skeleton type="text" width="60%" class="skeleton-dark" />
              </div>
              <div class="ultima-resposta-container">
                <q-skeleton type="text" width="100px" class="skeleton-dark" />
                <q-skeleton type="text" width="80px" class="skeleton-dark" />
              </div>
            </div>
          </div>
        </div>

        <!-- Conteúdo real para Tópicos Recentes -->
        <div class="forum" v-else>
          <div class="forum-card-post">
            <p>Tópicos recentes</p>
          </div>
          <div v-for="(topico, index) in recentTopics" :key="'recentes-'+index" class="topicos">
            
            <div class="flex">
              <router-link :to="`/forum/view/${encodeURIComponent(topico.category)}/${encodeURIComponent(topico.title)}?id=${topico.id}`" class="flex" style="text-decoration: none; color: inherit;">
              <div class="skin"><img :src="topico.avatar" width="60" height="60" alt="[IMG]" style="border-radius: 10px;"></div>
              <div class="topicos-title">
                <p>{{ topico.title }}</p>
                <div class="topicos-subtitle">
                  <p>Postado em '{{ topico.category }}'</p>
                </div>
                <div class="topicos-views">
                  <q-icon name="chat"></q-icon> {{ topico.replies }} respostas 
                  <q-icon name="visibility"></q-icon> {{ topico.views }} visualizações
                </div>
              </div>
            </router-link>
              <div class="ultima-resposta-container">
                <div class="ultima-resposta">
                  <p v-if="topico.last_reply_user">Última resposta</p>
                  <p v-else>Nenhuma resposta</p>
                  <div class="ultima-resposta-pessoa" v-if="topico.last_reply_user">
                    <p>{{ topico.last_reply_user }}, {{ topico.last_reply_time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>

        <!-- Skeleton para Fórum Geral -->
        <div class="forum-baixo" v-if="loading">
          <div class="forum-card-post">
            <q-skeleton type="text" width="100px" class="skeleton-dark" />
          </div>
          <div class="linha"></div>  
          <div v-for="i in 5" :key="'forum-skeleton-'+i" class="topicos-abaixo">
            <div class="flex">
              <div class="topicos-title-baixo">
                <q-skeleton type="text" width="70%" class="skeleton-dark" />
              </div>
              <div class="ultima-resposta-container">
                <q-skeleton type="text" width="60px" class="skeleton-dark" />
                <q-skeleton type="text" width="60px" class="skeleton-dark" />
              </div>
            </div>
          </div>
        </div>

        <!-- Conteúdo real para Fórum Geral -->
        <div class="forum-baixo" v-else>
          <div class="forum-card-post">
            <p>Geral</p>
          </div>
          <div class="linha"></div>  
          <div v-for="(forum, index) in forums" :key="'forum-'+index" class="topicos-abaixo">
            <router-link :to="'/forum/view/' + forum.name" class="flex" style="text-decoration: none; color: inherit;">
              <div class="topicos-title-baixo">
                <p>{{ forum.name }}</p>
                <p class="forum-description">{{ forum.description }}</p>
              </div>
              <div class="ultima-resposta-container">
                <div class="ultima-resposta">
                  <p>{{ forum.threads }} tópicos</p>
                  <div class="ultima-resposta-pessoa">
                    <p>{{ forum.threads }} postagens</p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="forum-side">
        <!-- Skeleton para Publicidade -->
        <div class="forum-baixo" style="margin-top: 0px;" v-if="loading">
          <div class="forum-card-post">
            <q-skeleton type="text" width="120px" class="skeleton-dark" />
          </div>
          <div class="linha"></div>
          <div class="publi-top">
            <q-skeleton height="150px" width="100%" class="skeleton-dark" />
          </div>
        </div>

        <!-- Conteúdo real para Publicidade -->
        <div class="forum-baixo" style="margin-top: 0px;" v-else>
          <div class="forum-card-post">
            <p>Publicidade</p>
          </div>
          <div class="linha"></div>
          <div class="publi-top">
            <div class="publi">
            </div>
          </div>
        </div>

        <!-- Skeleton para Equipe lateral -->
        <div class="forum-baixo" style="margin-top: 20px;" v-if="loading">
          <div class="forum-card-post">
            <q-skeleton type="text" width="100px" class="skeleton-dark" />
          </div>
          <div class="linha"></div>
          <div v-for="i in 3" :key="'member-skeleton-'+i" class="equipe-tipo">
            <div class="flex">
              <div class="skin" style="margin-top: -10px;">
                <q-skeleton type="circle" width="40px" height="40px" class="skeleton-dark" />
              </div>
              <div class="equipe-title" style="width: 100%">
                <q-skeleton type="text" width="60%" class="skeleton-dark" />
                <q-skeleton type="text" width="40%" class="skeleton-dark" />
              </div>
              <div class="ultima-resposta-container" style="margin-top: -25px;">
                <q-skeleton type="circle" width="25px" height="25px" class="skeleton-dark" />
              </div>
            </div>
          </div>
        </div>

        <!-- Conteúdo real para Equipe lateral -->
        <div class="forum-baixo" style="margin-top: 20px;" v-else>
          <div class="forum-card-post">
            <p>Equipe</p>
          </div>
          <div class="linha"></div>
          <div class="equipe-tipo" v-for="(member, index) in teamMembers" :key="'member-'+index">
            <div class="flex">
              <div class="skin" style="margin-top: -10px;"><img :src="member.avatar" width="40" height="40" alt="[IMG]" style="border-radius: 10px;"></div>
              <div class="equipe-title">
                <p>{{ member.name }}</p>
                <div class="equipe-titulo">
                  <p>{{ member.role }}</p>
                </div>
              </div>
              <div class="ultima-resposta-container" style="margin-top: -25px;">
                <div class="ultima-resposta" style="font-size: 25px; color: gray;">
                  <q-icon name="more_vert"></q-icon>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skeleton para Estatísticas -->
        <div class="forum-baixo" style="margin-top: 20px;" v-if="loading">
          <div class="forum-card-post">
            <q-skeleton type="text" width="120px" class="skeleton-dark" />
          </div>
          <div class="linha"></div>
          <div class="flex" style="padding: 1.5em; padding-top: 0px; margin-top: -50px; margin-bottom: -40px;">
            <div class="left-info">
              <q-skeleton type="text" width="80px" class="skeleton-dark" />
              <q-skeleton type="text" width="80px" class="skeleton-dark" />
              <q-skeleton type="text" width="80px" class="skeleton-dark" />
            </div>
            <div class="ultima-resposta-container" style="margin-top: 0;">
              <div class="ultima-resposta" style="text-align: right; color: gray; padding-top: 0; margin-top: 0; line-height: 10px; margin-top: 40px;">
                <q-skeleton type="text" width="30px" class="skeleton-dark" />
                <q-skeleton type="text" width="30px" class="skeleton-dark" />
                <q-skeleton type="text" width="30px" class="skeleton-dark" />
              </div>
            </div>
          </div>
        </div>

        <!-- Conteúdo real para Estatísticas -->
        <div class="forum-baixo" style="margin-top: 20px;" v-else>
          <div class="forum-card-post">
            <p>Estatísticas</p>
          </div>
          <div class="linha"></div>
          <div class="flex" style="padding: 1.5em; padding-top: 0px; margin-top: -50px; margin-bottom: -40px;">
            <div class="left-info">
              <p>Postagens</p>
              <p>Membros</p>
              <p>Convidados</p>
            </div>
            <div class="ultima-resposta-container" style="margin-top: 0;">
              <div class="ultima-resposta" style="text-align: right; color: gray; padding-top: 0; margin-top: 0; line-height: 10px; margin-top: 40px;">
                <p>{{ stats.posts }}</p>
                <p>{{ stats.members }}</p>
                <p>{{ stats.guests }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForumPage',
  data() {
    return {
      loading: true,
      teamMembers: [],
      recentTopics: [],
      forums: [],
      teamForums: [],
      stats: {
        posts: 0,
        members: 0,
        guests: 0
      },
      error: null
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      this.error = null;
      try {
        // Primeiro: carregar dados básicos de forma independente
        await this.loadTeamMembers();
        await this.loadRecentTopics();
        await this.loadForumCategories();
        await this.loadStats();
        
        // Depois: carregar tópicos por categoria se necessário
        if (this.forums.length > 0) {
          await this.loadCategoryTopics();
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        this.error = "Não foi possível carregar alguns dados do fórum. Algumas informações podem estar incompletas.";
      } finally {
        this.loading = false;
      }
    },
    
    async loadTeamMembers() {
      try {
        const res = await fetch('http://localhost:3001/api/team');
        if (!res.ok) throw new Error('Erro ao carregar equipe');
        this.teamMembers = await res.json();
      } catch (error) {
        console.error('Erro ao carregar membros da equipe:', error);
        this.teamMembers = [];
      }
    },
    
    async loadRecentTopics() {
      try {
        const res = await fetch('http://localhost:3001/api/forum/recent-topics?limit=5');
        if (!res.ok) throw new Error('Erro ao carregar tópicos recentes');
        this.recentTopics = await res.json();
      } catch (error) {
        console.error('Erro ao carregar tópicos recentes:', error);
        this.recentTopics = [];
      }
    },
    
    async loadForumCategories() {
      try {
        const res = await fetch('http://localhost:3001/api/forum/categories?type=main');
        if (!res.ok) throw new Error('Erro ao carregar categorias');
        this.forums = await res.json();
      } catch (error) {
        console.error('Erro ao carregar categorias do fórum:', error);
        this.forums = [];
        // Define um erro mais específico para categorias
        this.error = "Não foi possível carregar as categorias do fórum. O resto do conteúdo será exibido.";
      }
    },
    
    async loadStats() {
      try {
        const res = await fetch('http://localhost:3001/api/forum/stats');
        if (!res.ok) throw new Error('Erro ao carregar estatísticas');
        this.stats = await res.json();
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        this.stats = { posts: 0, members: 0, guests: 0 };
      }
    },
    
    async loadCategoryTopics() {
      try {
        const categoryTopics = await Promise.all(
          this.forums.map(forum => 
            fetch(`http://localhost:3001/api/forum/topics/${encodeURIComponent(forum.name)}`)
              .then(res => res.ok ? res.json() : [])
              .catch(() => []) // Se falhar, retorna array vazio
          )
        );
        
        this.forums = this.forums.map((forum, index) => ({
          ...forum,
          threads: categoryTopics[index]?.length || 0,
          posts: categoryTopics[index]?.reduce((sum, topic) => sum + (topic.replies || 0) + 1, 0) || 0
        }));
      } catch (error) {
        console.error('Erro ao carregar tópicos por categoria:', error);
      }
    }
  }
}
</script>
  <style>
  .forum-description {
    font-size: 14px;
    color: rgb(107, 107, 107);
    font-weight: normal;
    margin-top: -18px;
  }
  /* Estilo para os skeletons */
  .skeleton-dark {
    background-color: rgba(255, 255, 255, 0.1) !important;
    border-radius: 10px;
  }
  
  .skin img {
    border-radius: 10px !important;
  }
  
  .left-info {
    margin-bottom: -30px;
    text-align: left;
    padding: 0;
    margin-top: 0;
    color: gray;
    line-height: 10px;
    flex-grow: 1;
  }
  
  .equipe-titulo {
    margin-top: -20px;
    color:gray;
    font-size: 15px;
    font-weight: normal;
  }
  .equipe-title {
    color: orange;
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