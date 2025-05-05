<template>
  <div class="pagina">
    <div class="container">
  <!--    <div class="flex">
        <div class="videos">
          <div v-for="video in videos" :key="video.id" class="video-item">
            <div class="video-thumbnail">
              <video
    :ref="'video' + video.id"
    :src="video.url"
    autoplay
    controls
    @play="startFrameCapture(video)"
    @pause="stopFrameCapture"
    class="main-video"
  ></video>

  <video
    :ref="'blurVideo' + video.id"
    :src="video.url"
    autoplay
    controls
    class="blur-background"
  ></video>


              <div class="video-title">
                <p>{{ video.title }}</p>
              </div>
              <div class="video-subtitle">
                <p>Disponível em outubro</p>
              </div>
            </div>
          </div>
        </div>
      </div>-->

      <div class="banners">
        <div 
          v-for="(banner, index) in banners" 
          :key="index" 
          class="banner-um"
          @click="redirectTo(banner.link)"
        >
          <div class="imagem" :style="{ backgroundImage: 'url(' + banner.image + ')' }">
            <div class="card-bottom">
              <div class="vip">
                <p>{{ banner.title }}</p>
              </div>
              <div class="vip-desc">
                <p>{{ banner.subtitle }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="torneio-wrapper">
        <div class="topico-sky">
          <div class="campo-cima-sky">
            <div class="topico-sky-title">
              <p>Sky Block</p>
            </div>
            <div class="topico-sky-subtitle">
              <p>Postado por Matcky</p>
            </div>
            <div class="linha"></div>
            <div class="texto-topico">
              <p>
                Chegou o momento que todos estavam esperando! Em outubro, abrimos oficialmente as portas da Boom, a rede que vai revolucionar a sua experiência!

Prepare-se para uma jornada única, repleta de desafios, competições e, claro, prêmios imperdíveis! Em OUTUBRO, estaremos distribuindo R$ 15.000 para os jogadores mais habilidosos e dedicados durante a primeira temporada da rede.
<br><br>
Seja você um mestre das batalhas PvP, um gênio da construção ou um estrategista nato, este é o seu momento de brilhar! Com torneios mensais, sorteios e eventos exclusivos, há sempre uma nova oportunidade para mostrar seu talento e garantir recompensas incríveis.

Junte-se à BOOM e faça parte de uma comunidade vibrante, onde cada jogada pode te levar ao topo.
<br><br>
</p>
<div class="badge-orange"><b>Aventura incrível</b></div>
<p>
Em 2025, prepare-se para a chegada do maior servidor de Minecraft do Brasil! Uma revolução no universo dos games está prestes a acontecer, trazendo uma experiência única e incomparável para todos os jogadores. Este novo servidor promete elevar o patamar do entretenimento e da competição online a um nível jamais visto.
<br><br>
Com mapas exclusivos, eventos especiais e uma comunidade vibrante, o servidor promete ser o ponto de encontro de milhares de jogadores apaixonados pelo Minecraft. Além disso, o time de suporte e desenvolvimento estará sempre disponível para garantir que sua experiência seja a melhor possível.
<br><br>
</p>
<div class="badge-blue"><b>Agenda</b></div>
<p>
<b>Então, marque na sua agenda:</b> em 2025, o maior servidor de Minecraft do país abrirá suas portas. Prepare-se para desafiar seus limites, fazer novos amigos e viver aventuras inesquecíveis.
</p>
              <div class="linha"></div>
              <div class="reacoes-topico">
                <p><q-icon name="visibility"></q-icon> 100 visualizações</p>
                <p><q-icon name="thumb_up"></q-icon> 12 curtidas</p>
                <p><q-icon name="share"></q-icon> 52 compartilhamentos</p>
              </div>
            </div>
          </div>
        </div>

        <div class="torneio-section">
          <div class="torneio-content">
            <div class="torneio-details">
              <h3>ATÉ R$ 15.000</h3>
              <p style="margin-top: -23px;">Participe do maior torneio de SkyBlock do Brasil!</p>
              <ul class="premiacao">
                <li><span class="posicao">1º</span> R$ 7.000 no PIX</li>
                <li><span class="posicao">2º</span> R$ 5.000 no PIX</li>
                <li><span class="posicao">3º</span> R$ 3.000 no PIX</li>
              </ul>
              <button class="inscrever-button">INSCREVA-SE AGORA</button>
              
              <div class="torneio-timer">
                <div class="timer-title">EVENTO COMEÇA EM</div>
                <div class="timer">
                  <div class="timer-block">
                    <div class="timer-number">15</div>
                    <div class="timer-label">DIAS</div>
                  </div>
                  <div class="timer-block">
                    <div class="timer-number">23</div>
                    <div class="timer-label">HORAS</div>
                  </div>
                  <div class="timer-block">
                    <div class="timer-number">45</div>
                    <div class="timer-label">MIN</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-card">
        A BOOM não é, de maneira alguma, afiliada à ou endossada pela Mojang.
        <div class="footer-opcoes" style="margin-bottom: -25px;">
          <p>Termos de Serviço</p>
          <p>Privacidade</p>
          <p>Cookies</p>
          <p>Contato</p>
          <p>FAQ</p>
          <p>Como ativar VIP</p>
          <p>Promoções</p>
          <p>Equipe</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  
  .videos {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-bottom: 40px;
    width: 100%;
    padding: 0em;
    margin-top: -30px;
    position: relative;
  }
  
  .video-thumbnail {
    position: relative;
    display: inline-block;
    border-radius: 20px;
    overflow: visible;
  }
  
  .main-video {
    width: 435px;
    height: 770px;
    margin-top: 30px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-bottom: -30px;
    border-radius: 20px;
    position: relative;
    z-index: 2;
    background-color: #000;
    transition: box-shadow 800ms ease-out;
  }
  
  .blur-background {
  position: absolute;
  top: -30px;
  left: -30px;
  right: -30px;
  bottom: -30px;
  width: calc(100% + 60px);
  height: calc(100% + 60px);
  filter: blur(35px) brightness(1.1);
  opacity: 0;
  z-index: 1;
  border-radius: 30px;
  object-fit: cover;
  transition: opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), 
              filter 1200ms cubic-bezier(0.16, 1, 0.3, 1);
}
  
  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    pointer-events: none;
    z-index: 3;
  }
  
  .progress-bar-container {
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.3);
    margin-bottom: 16px;
  }
  
  .progress-bar {
    height: 100%;
    background-color: white;
    transition: width 0.1s linear;
  }
  
  .interaction-sidebar {
    position: absolute;
    right: 16px;
    bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .interaction-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
  }
  
  .interaction-count {
    font-size: 12px;
    margin-top: 4px;
    color: white;
  }
  
  .video-description {
    margin-bottom: -20px;
    font-size: 14px;
    line-height: 1.4;
    color: white;
    text-align: left;
  }
  
  .music-info {
    display: flex;
    align-items: center;
    margin-top: 8px;
    font-size: 14px;
    color: white;
  }
  
  .music-info svg {
    margin-right: 8px;
  }
  
  .navigation-buttons {
    position: absolute;
    right: -60px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .nav-button {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    pointer-events: auto;
  }
  
  .nav-button:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  
  .nav-button svg {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: 1200px) {
    .container {
      width: 95%;
    }
    
    .navigation-buttons {
      right: 10px;
    }
  }
/* Estilos do vídeo */
.secao-um {
  background: #0f0f0f;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
}

.videos {
  display: flex;
  justify-content: left;
  align-items: left;
  height: 100%;
  margin-bottom: 40px;
  width: 100%;
  padding: 0em;
  margin-top: -50px;
}

.video-thumbnail {
  position: relative;
  display: inline-block;
}

.video-thumbnail video {
  width: 1150px;
  margin-top: 30px;
  margin-bottom: -30px;
  height: auto;
  border-radius: 20px;
  transition: box-shadow 0.5s ease-in-out;
}

.video-item {
  display: flex;
  vertical-align: top;
  gap: 10px;
}

.video-title, .video-subtitle {
  position: absolute;
  padding: 0.5em;
  left: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-title {
  top: 50px;
  font-size: 20px;
  color: white;
  font-weight: 800;
}

.video-subtitle {
  top: 80px;
  font-weight: normal;
  font-size: 18px;
  color: gray;
}

.video-thumbnail:hover .video-title,
.video-thumbnail:hover .video-subtitle {
  opacity: 1;
}

.video-overlay {
  position: absolute;
  bottom: 10%; 
  left: 2%;
  font-size: 18px;
  color: white;
  font-weight: bold;
  background: linear-gradient(to right, rgb(0, 50, 150), rgb(0, 110, 255)); 
  padding: 10px;
  border-radius: 20px;
  opacity: 0; 
  animation: slideUp 3s ease-out forwards; 
}

@keyframes slideUp {
  0% {
    bottom: 0px; 
    opacity: 0; 
  }
  100% {
    bottom: 10%; 
    opacity: 1; 
  }
}

.descricao-title-dois {
  font-weight: normal;
  margin-top: -19px;
  color: gray;
}
.descricao {
  background: #202020;
  border-radius: 13px;
  width: 1100px;
  padding: 1em;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.774);
  height: 60px;
}
.title {
  font-weight: bold;
  margin-top: -55px;
  color: rgba(255, 255, 255, 0.808);
  font-size: 22px;
}

.badge-blue {
  background-image: url("https://shadersmods.com/wp-content/uploads/2023/04/super-duper-vanilla-shaders-mc-9-928x522.png");
  background-position: center;
  padding: 1em;
  margin-bottom: 10px;
  margin-top: -25px;
  color: white;
  font-weight: bold;
}
.badge-orange {
  background-image: url("https://i.redd.it/pdr1nnnb29b71.png");
  background-position: center;
  padding: 1em;
  margin-bottom: 10px;
  margin-top: -25px;
  color: white;
  font-weight: bold;
}
.reacoes-topico {
  margin-top: 13px;
  margin-bottom: -25px;
  display: flex;
  font-size: 12px;
  align-items: right;
  justify-content: right;
  gap: 10px;
  color: rgba(128, 128, 128, 0.562);
}
.texto-topico {
  margin-top: 10px;
  font-size: 17px;
  color: gray;
}
.linha {
  width: 100%;
  height: 1px;
  background: rgba(128, 128, 128, 0.103);
}
.topico-sky-subtitle {
  color: gray;
  margin-top: -18px;
}
.topico-sky-title {
  color: white;
  font-weight: bold;
  font-size: 25px;
}
.campo-cima-sky {
  padding: 2em;
  text-align: left;
}
.topico-sky {
  border: 1px solid rgba(128, 128, 128, 0.13);
  border-radius: 20px;
  background: rgba(10, 10, 10, 0.548);
  flex: 2.5;

}
.banner-um {
  width: 100%;
  height: 470px;
  border: 1px solid rgba(128, 128, 128, 0.13);
  border-radius: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.banner-um:hover {
  border: 1px solid rgb(36, 36, 36);
}

.banners {
  display: flex;
  gap: 5px;
  width: 1170px;
  padding-left: 0px;
  margin-left: 0px;
  margin-right: 0px;
  padding-right: 0px;
}

/* Estilos Base */
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

.imagem {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  box-shadow: inset 0 -200px 150px -20px rgb(0, 0, 0);
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.card-bottom {
  margin-top: 349px;
  padding: 20px;
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
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.vip-desc {
  font-size: 17px;
  text-align: left;
  margin-top: -18px;
  color: #ccc;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Seção Torneio e Tópico Sky lado a lado */
.torneio-wrapper {
  display: flex;
  gap: 20px;
  margin-top: 0px;
  align-items: flex-start; /* Alinha os itens pelo topo */
}

.torneio-section {
  background: linear-gradient(135deg, #000000 0%, #470068 100%);
  border-radius: 20px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.torneio-content {
  position: relative;
  z-index: 2;
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
  background: linear-gradient(90deg, #0e0e0e, #252525);
  border: none;
  padding: 15px 40px;
  font-size: 18px;
  width: 100%;
  margin-bottom: 30px;
}

.inscrever-button:hover {
  background: linear-gradient(90deg, #0e0e0e, #252525);
}

.torneio-timer {
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 15px;
  margin-top: auto;
}

.timer-title {
  color: #6d00a0;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
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
  text-align: center;
}

.timer-label {
  color: #aaa;
  font-size: 14px;
  text-align: center;
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

@media (max-width: 1200px) {
  .torneio-wrapper {
    flex-direction: column;
  }
  
  .container {
    width: 95%;
  }
  
  .banners {
    width: 100%;
    flex-direction: column;
  }
  
  .banner-um {
    margin-right: 0;
    margin-bottom: 20px;
  }
}
</style>

<script>
export default {
  name: 'InicioPage',
  data() {
    return {
      videos: [
        {
          id: 1,
          title: "Sky Block",
          url: require("@/assets/mine2.mp4"),
          showText: true,
          likes: "4",
          comments: "25",
          description: "Minha mansão do Sky Block",
          music: "A música vinculada vai aqui",
          userAvatar: ""
        },
      ],
      banners: [
        {
          image: "https://preview.redd.it/gcr5e8d4h4c61.png?width=1920&format=png&auto=webp&s=2b84422cfb772b43b2d60baca0dc35995377cef7", // Substitua pela URL real da imagem
          title: "Sky Block",
          subtitle: "Desbloqueie benefícios exclusivos",
          link: "/vip"
        },
        {
          image: "https://cdn.mos.cms.futurecdn.net/my8AUCgUhKERqBBwdPQuXG.jpg", // Substitua pela URL real da imagem
          title: "Discord",
          subtitle: "Participe e ganhe prêmios",
          link: "/torneio"
        },
        {
          image: "https://mods.store.gx.me/mod/9e8b0447-b6b1-4e0a-81fb-305bbe45c220/cover/49e580a9-2032-493e-ae57-2e35a6fed749?c154828214ba5c18f7e36658e1d26d0d", // Substitua pela URL real da imagem
          title: "Loja",
          subtitle: "Compre itens exclusivos",
          link: "/loja"
        }
      ],

      canvas: null,
      offscreenCanvas: null,
      progress: 0,
      progressInterval: null,
      animationFrameId: null,
      currentColor: [0, 0, 0],
      targetColor: [0, 0, 0],
      colorTransition: 0
    };
  },
  methods: {
    redirectTo(link) {
    this.$router.push(link); // Redireciona para a rota especificada
  },
    handlePrev() {
      console.log("Previous video");
    },
    
    handleNext() {
      console.log("Next video");
    },
    
    startProgress() {
      this.progress = 0;
      clearInterval(this.progressInterval);
      
      this.progressInterval = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          clearInterval(this.progressInterval);
          this.handleNext();
        }
      }, 100);
    },
    
    startFrameCapture(video) {
      const videoElement = this.$refs["video" + video.id][0];
      const blurVideoElement = this.$refs["blurVideo" + video.id][0];

      videoElement.muted = false;
      blurVideoElement.muted = false;
      // Mostra o blur com transição suave
      blurVideoElement.style.opacity = "0.7";
      blurVideoElement.style.filter = "blur(35px) brightness(1.1)";
      
      // Sincroniza os vídeos
      const syncVideos = () => {
        if (!videoElement.paused && !videoElement.ended) {
          blurVideoElement.currentTime = videoElement.currentTime;
          this.animationFrameId = requestAnimationFrame(syncVideos);
        }
      };
      
      if (!this.canvas) {
        this.canvas = document.createElement("canvas");
        this.offscreenCanvas = document.createElement("canvas");
      }

      // Inicia a captura de frames
      const captureFrame = () => {
        if (!videoElement.paused && !videoElement.ended) {
          this.updateBlurEffect(video);
          this.animationFrameId = requestAnimationFrame(captureFrame);
        }
      };

      syncVideos();
      captureFrame();
      this.startProgress();
    },

    updateBlurEffect(video) {
      const videoElement = this.$refs["video" + video.id][0];
      const blurVideoElement = this.$refs["blurVideo" + video.id][0];
      const width = videoElement.videoWidth;
      const height = videoElement.videoHeight;
      
      if (width === 0 || height === 0) return;
      
      // Configura os canvases
      this.canvas.width = width;
      this.canvas.height = height;
      const ctx = this.canvas.getContext("2d");
      ctx.drawImage(videoElement, 0, 0, width, height);
      
      // Reduz para análise (50x50 pixels)
      this.offscreenCanvas.width = 50;
      this.offscreenCanvas.height = 50;
      const offscreenCtx = this.offscreenCanvas.getContext("2d");
      offscreenCtx.drawImage(this.canvas, 0, 0, 50, 50);
      
      // Obtém cores predominantes
      const imageData = offscreenCtx.getImageData(0, 0, 50, 50).data;
      const colors = this.getDominantColors(imageData);
      
      // Atualiza a cor alvo suavemente
      if (this.colorTransition >= 1) {
        this.targetColor = colors[0] || [0, 0, 0];
        this.colorTransition = 0;
      } else {
        this.colorTransition += 0.02; // Transição mais suave
      }
      
      // Interpolação suave entre cores
      this.currentColor = [
        Math.round(this.currentColor[0] + (this.targetColor[0] - this.currentColor[0]) * 0.03),
        Math.round(this.currentColor[1] + (this.targetColor[1] - this.currentColor[1]) * 0.03),
        Math.round(this.currentColor[2] + (this.targetColor[2] - this.currentColor[2]) * 0.03)
      ];
      
      // Calcula intensidade baseada no brilho
      const brightness = this.calculateBrightness(this.currentColor);
      const intensity = Math.min(0.8, brightness / 255 * 0.9);
      
      // Aplica o efeito com transição suave
      blurVideoElement.style.opacity = (0.9 + (intensity * 0.4)).toFixed(2);
      blurVideoElement.style.filter = `
        blur(95px)
        brightness(${(1 + intensity * 0.3).toFixed(2)})
        drop-shadow(0 0 10px rgba(${this.currentColor[0]}, ${this.currentColor[1]}, ${this.currentColor[2]}, ${(intensity * 0.1).toFixed(2)}))
      `;
    },
    
    getDominantColors(imageData) {
      const colorCount = {};
      
      // Analisa 1 pixel a cada 16 para performance
      for (let i = 0; i < imageData.length; i += 16) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const key = `${r},${g},${b}`;
        
        colorCount[key] = (colorCount[key] || 0) + 1;
      }
      
      // Ordena e retorna cores dominantes
      return Object.entries(colorCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(item => item[0].split(',').map(Number));
    },
    
    calculateBrightness(rgb) {
      return Math.sqrt(
        0.299 * (rgb[0] * rgb[0]) +
        0.587 * (rgb[1] * rgb[1]) +
        0.114 * (rgb[2] * rgb[2])
      );
    },

    stopFrameCapture() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      clearInterval(this.progressInterval);
    }
  },
  mounted() {
    this.canvas = document.createElement("canvas");
    this.offscreenCanvas = document.createElement("canvas");
  },
  beforeUnmount() {
    this.stopFrameCapture();
  }
}
</script>