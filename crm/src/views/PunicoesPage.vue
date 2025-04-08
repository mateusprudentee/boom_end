<template>
    <div class="container" style="margin-top: 110px;">
      <div class="forum-layout">
        <div class="forum-main">
          <!-- Skeleton para Tópicos Recentes -->
          <div class="forum" v-if="loading">
            <div class="forum-card-post">
              <q-skeleton type="text" width="100%" class="skeleton-dark" />
              <q-skeleton type="text" width="100%" class="skeleton-dark" />
              <q-skeleton type="text" width="100%" class="skeleton-dark" />
              <q-skeleton type="text" width="100%" class="skeleton-dark" />
              <q-skeleton type="text" width="100%" class="skeleton-dark" />
              <q-skeleton type="text" width="100%" class="skeleton-dark" />
              <q-skeleton type="text" width="100%" class="skeleton-dark" />
              <q-skeleton type="text" width="100%" class="skeleton-dark" />
              <q-skeleton type="text" width="100%" class="skeleton-dark" />
              <q-skeleton type="text" width="100%" class="skeleton-dark" />
            </div>
          </div>
  
          <!-- Conteúdo real para Punições -->
          <div class="forum" v-else>
            <div class="forum-card-post">
              <p>Punições</p>
              <p style="font-size: 16px; color: gray; margin-top: -20px;">{{ punicoes.length }} aplicadas.</p>
            </div>
            <div class="corpo-punicoes">
              <div v-for="(punicao, index) in punicoes" :key="index" class="punicao-item" @click="togglePunicao(index)">
                <div class="flex horario-punicao">
                  <p><q-icon name="alarm"></q-icon> {{ punicao.HORA }}</p>
                  <p class="punicao-mensagem">{{ punicao.NICK }} foi {{ punicao.TIPO }} por {{ punicao.AUTOR }}</p>
                  <p>{{ punicao.SERVIDOR }}</p>
                </div>
                <div class="punicao-detalhes-container" v-if="punicao.expandido">
                  <div class="seta-cima"></div>
                  <div class="punicao-detalhes">
                    <div class="detalhe-item">
                      <strong>Motivo</strong> 
                      <div class="detalhe-valor">
                        {{ punicao.MOTIVO || 'Não informado.' }}
                      </div>
                    </div>
                    <div class="detalhe-item">
                      <strong>Término</strong> 
                      <div class="detalhe-valor">
                        {{ punicao.TERMINO || 'Não informado.' }}
                      </div>
                    </div>
                    <div class="detalhe-item">
                      <strong>Status</strong> 
                      <div class="detalhe-valor">
                        Ativo
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="forum-side">
          <!-- Skeleton para Publicidade -->
          <div v-if="loading">
            <div class="forum-card-post">
              <q-skeleton type="text" width="100%" height="49px" style="margin-top: -10px;" class="skeleton-dark" />
              <q-skeleton type="text" width="100%" height="499px" style="margin-top: -130px;" class="skeleton-dark" />
            </div>
          </div>
  
          <!-- Conteúdo real -->
          <div v-else>
            <div class="forum-baixo" style="margin-top: 0px;">
              <div class="forum-card-post">
                <p>Siga as regras</p>
              </div>
              <div class="linha"></div>
              <div class="orientacao">
                <p>As diretrizes orientam os jogadores a não serem punidos na rede, além de manter um ambiente saudável entre a equipe de moderação e jogadores.</p>
              </div>
            </div>
  
            <div class="forum-baixo" style="margin-top: 20px;">

              <div class="contribua-container">
                <div class="periodos">
                  <p>Diário</p>
                  <p>Semanal</p>
                  <p>Mensal</p>
                  <p>Anual</p>
                  <p>Total</p>
                </div>
                <div class="valores">
                  <p>51</p>
                  <p>0</p>
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
  </template>
  
  <style>
  /* Estilos para a seção Contribua */
  .contribua-container {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    margin-bottom: -15px;
    margin-top: 10px;
  }
  
  .periodos {
    color: gray;
    text-align: left;
  }
  
  .periodos p, .valores p {
    padding: 0.2em;
    justify-content: center;
    margin: 0 auto;
    margin-left: 20px;
  }
  
  .valores {
    color: white;
    text-align: right;
    margin-right: 30px;
  }
  
  /* Estilos existentes */
  .total-right {
    color: white;
  }
  
  .orientacao {
    color: gray;
    text-align: justify;
    padding: 1.5em;
    padding-top: 0em;
    margin-top: -20px;
    margin-bottom: -40px;
  }
  
  .corpo-punicoes {
    margin-top: -70px;
    margin-left: 210px;
  }
  
  .seta-cima {
    width: 0; 
    height: 0; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid rgb(17, 145, 0);
    margin-left: 30px;
    margin-bottom: -9px;
    position: relative;
    top: 1px;
  }
  
  .punicao-detalhes-container {
    position: relative;
    margin-top: 10px;
  }
  
  .punicao-item {
    padding: 1em;
    margin: 0 auto;
    cursor: pointer;
    width: 450px;
    transition: background-color 0.2s;
  }
  
  .punicao-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .punicao-detalhes {
    margin-top: 10px;
    padding: 15px;
    display: flex;
    gap: 20px;
    background-color: rgb(17, 145, 0);
    margin-left: 20px;
    margin-right: 20px;
  }
  
  .horario-punicao {
    color: rgb(158, 158, 158);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 0 20px;
  }
  
  .punicao-mensagem {
    flex-grow: 1;
    text-align: left;
    margin-left: 10px;
  }
  
  .detalhe-item {
    margin-bottom: 5px;
    color: white;
    text-align: left;
    min-width: 120px;
  }
  
  .detalhe-valor {
    word-break: break-word;
    margin-top: 5px;
  }
  
  .expand-icon {
    margin-left: auto;
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
  
  <script>
  export default {
    name: 'PunicoesPage',
    data() {
      return {
        loading: true,
        punicoes: [
          {
            HORA: "22:00",
            NICK: "aaaa",
            TIPO: "banido",
            AUTOR: "Maktdy",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "Permanente"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          },
          {
            HORA: "21:45",
            NICK: "aaaaa",
            TIPO: "silenciado",
            AUTOR: "Matcky",
            SERVIDOR: "RankUP",
            MOTIVO: "Hack",
            TERMINO: "3 dias"
          }
        ]
      }
    },
    methods: {
      togglePunicao(index) {
        this.punicoes[index].expandido = !this.punicoes[index].expandido;
      }
    },
    created() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.punicoes = this.punicoes.map(p => ({ ...p, expandido: false }));
      }, 1000);
    }
  };
  </script>