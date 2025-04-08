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
            <div v-for="(topico, index) in topicosRecentes" :key="'recentes-'+index" class="topicos">
              <div class="flex">
                <div class="skin"><img :src="topico.avatar" width="60" height="60" alt="[IMG]" style="border-radius: 10px;"></div>
                <div class="topicos-title">
                  <P>{{ topico.titulo }}</P>
                  <div class="topicos-subtitle">
                    <p>Postado em '{{ topico.categoria }}'</p>
                  </div>
                  <div class="topicos-views">
                    <q-icon name="chat"></q-icon> {{ topico.respostas }} respostas 
                    <q-icon name="visibility"></q-icon> {{ topico.visualizacoes }} visualizações
                  </div>
                </div>
                <div class="ultima-resposta-container">
                  <div class="ultima-resposta">
                    <p>Última resposta</p>
                    <div class="ultima-resposta-pessoa">
                      <p>{{ topico.ultimaResposta.usuario }}, {{ topico.ultimaResposta.tempo }}</p>
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
              <div class="flex">
                <div class="topicos-title-baixo">
                  <P>{{ forum.nome }}</P>
                </div>
                <div class="ultima-resposta-container">
                  <div class="ultima-resposta">
                    <p>{{ forum.threads }} tópicos</p>
                    <div class="ultima-resposta-pessoa">
                      <p>{{ forum.posts }} postagens</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Skeleton para Equipe -->
          <div class="forum-baixo" v-if="loading">
            <div class="forum-card-post">
              <q-skeleton type="text" width="100px" class="skeleton-dark" />
            </div>
            <div class="linha"></div>  
            <div v-for="i in 4" :key="'equipe-skeleton-'+i" class="topicos-abaixo">
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
  
          <!-- Conteúdo real para Equipe -->
          <div class="forum-baixo" v-else>
            <div class="forum-card-post">
              <p>Equipe</p>
            </div>
            <div class="linha"></div>  
            <div v-for="(equipe, index) in equipeForums" :key="'equipe-'+index" class="topicos-abaixo">
              <div class="flex">
                <div class="topicos-title-baixo">
                  <P>{{ equipe.nome }}</P>
                </div>
                <div class="ultima-resposta-container">
                  <div class="ultima-resposta">
                    <p>{{ equipe.threads }} tópicos</p>
                    <div class="ultima-resposta-pessoa">
                      <p>{{ equipe.posts }} postagens</p>
                    </div>
                  </div>
                </div>
              </div>
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
              <div class="publi"></div>
            </div>
          </div>
  
          <!-- Skeleton para Equipe lateral -->
          <div class="forum-baixo" style="margin-top: 0px;" v-if="loading">
            <div class="forum-card-post">
              <q-skeleton type="text" width="100px" class="skeleton-dark" />
            </div>
            <div class="linha"></div>
            <div v-for="i in 8" :key="'member-skeleton-'+i" class="equipe-tipo">
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
          <div class="forum-baixo" style="margin-top: 0px;" v-else>
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
          <div class="forum-side" v-if="loading">
            <div class="forum-baixo" style="margin-top: 0px;">
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
          </div>
  
          <!-- Conteúdo real para Estatísticas -->
          <div class="forum-side" v-else>
            <div class="forum-baixo" style="margin-top: 0px;">
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
                    <p>0</p>
                    <p>0</p>
                    <p>0</p>
                  </div>
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
        loading: true
      }
    },
    created() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    setup() {
      const teamMembers = [
        {
          name: "Azalim",
          role: "Perfeito",
          avatar: "https://cravatar.eu/helmavatar/Azalim/64",
        },
        {
          name: "Matcky",
          role: "Incrível",
          avatar: "https://cravatar.eu/helmavatar/Moderador1/64",
        },
        {
          name: "Pedroo",
          role: "Rápido",
          avatar: "https://cravatar.eu/helmavatar/Ajudante1/64",
        },
        {
          name: "Pedroo",
          role: "Rápido",
          avatar: "https://cravatar.eu/helmavatar/Ajudante1/64",
        },
        {
          name: "Pedroo",
          role: "Rápido",
          avatar: "https://cravatar.eu/helmavatar/Ajudante1/64",
        },
        {
          name: "Pedroo",
          role: "Rápido",
          avatar: "https://cravatar.eu/helmavatar/Ajudante1/64",
        },
        {
          name: "Pedroo",
          role: "Rápido",
          avatar: "https://cravatar.eu/helmavatar/Ajudante1/64",
        },
        {
          name: "Pedroo",
          role: "Rápido",
          avatar: "https://cravatar.eu/helmavatar/Ajudante1/64",
        }
      ];
      
      const topicosRecentes = [
        {
          avatar: "https://cravatar.eu/helmavatar/reaperxzz/64",
          titulo: "Novo sistema de ranks implementado",
          categoria: "Anúncios e Novidades",
          respostas: 15,
          visualizacoes: 120,
          ultimaResposta: {
            usuario: "Matcky",
            tempo: "5 minutos atrás"
          }
        },
        {
          avatar: "https://cravatar.eu/helmavatar/Notch/64",
          titulo: "Problemas com conexão",
          categoria: "Suporte",
          respostas: 8,
          visualizacoes: 75,
          ultimaResposta: {
            usuario: "Steve",
            tempo: "1 hora atrás"
          }
        },
        {
          avatar: "https://cravatar.eu/helmavatar/Herobrine/64",
          titulo: "Evento de construção semanal",
          categoria: "Eventos",
          respostas: 23,
          visualizacoes: 210,
          ultimaResposta: {
            usuario: "Alex",
            tempo: "30 minutos atrás"
          }
        },
        {
          avatar: "https://cravatar.eu/helmavatar/Dinnerbone/64",
          titulo: "Sugestão para novo minigame",
          categoria: "Sugestões",
          respostas: 12,
          visualizacoes: 95,
          ultimaResposta: {
            usuario: "Jeb_",
            tempo: "2 horas atrás"
          }
        },
        {
          avatar: "https://cravatar.eu/helmavatar/MHF_Steve/64",
          titulo: "Regras atualizadas - leiam!",
          categoria: "Informações",
          respostas: 5,
          visualizacoes: 300,
          ultimaResposta: {
            usuario: "Moderador",
            tempo: "10 minutos atrás"
          }
        }
      ];
  
      const forums = [
        {
          nome: "Anúncios e Novidades",
          threads: 24,
          posts: 156,
          descricao: "Notícias e atualizações do servidor"
        },
        {
          nome: "Suporte",
          threads: 42,
          posts: 287,
          descricao: "Problemas e dúvidas técnicas"
        },
        {
          nome: "Eventos",
          threads: 15,
          posts: 203,
          descricao: "Eventos e competições"
        },
        {
          nome: "Sugestões",
          threads: 37,
          posts: 421,
          descricao: "Ideias para melhorar o servidor"
        },
        {
          nome: "Off-topic",
          threads: 89,
          posts: 1024,
          descricao: "Conversas fora do tema principal"
        }
      ];
  
      const equipeForums = [
        {
          nome: "Introdução a Equipe",
          threads: 5,
          posts: 32,
          descricao: "Conheça nossa equipe"
        },
        {
          nome: "Moderação",
          threads: 18,
          posts: 145,
          descricao: "Área dos moderadores"
        },
        {
          nome: "Ajudante",
          threads: 7,
          posts: 56,
          descricao: "Tópicos dos ajudantes"
        },
        {
          nome: "Tutoriais",
          threads: 22,
          posts: 187,
          descricao: "Guias e tutoriais da equipe"
        }
      ];
  
      return { topicosRecentes, forums, equipeForums, teamMembers };
    }
  };
  </script>
  
  <style>
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