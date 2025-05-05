<template>
    <div class="pagina">
      <div class="container">
        <div class="flex">
          <div class="videos">
            <div v-for="video in videos" :key="video.id" class="video-item">
              <div class="video-thumbnail">
                <!-- Vídeo principal -->
                <video
                  :ref="'video' + video.id"
                  :src="video.url"
                  autoplay
                  loop
                  muted
                  @play="startFrameCapture(video)"
                  @pause="stopFrameCapture"
                  class="main-video"
                ></video>
                
                <!-- Vídeo de fundo com blur -->
                <video
                  :ref="'blurVideo' + video.id"
                  :src="video.url"
                  autoplay
                  loop
                  muted
                  class="blur-background"
                ></video>
                
                <!-- Elementos dentro do vídeo -->
                <div class="video-overlay">
                  <!-- Barra de progresso -->
                  <div class="progress-bar-container">
                    <div class="progress-bar" :style="{width: progress + '%'}"></div>
                  </div>
                  
                  <!-- Botões de interação à direita -->
                  <div class="interaction-sidebar">
                    <div class="interaction-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" fill="white"/>
                      </svg>
                      <span class="interaction-count">{{video.likes}}</span>
                    </div>
                    
                    <div class="interaction-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
                      </svg>
                      <span class="interaction-count">{{video.comments}}</span>
                    </div>
                    
                    <div class="interaction-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="white"/>
                      </svg>
                    </div>
                    
                    <div class="interaction-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Descrição do vídeo -->
                  <div class="video-description">
                    <p style="font-weight: bold;">matcky</p>
                    <p style="margin-top: -18px;">{{video.description}}</p>
                    <div class="music-info" style="margin-top: -13px;">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3V12.26C11.5 12.1 11 12 10.5 12C8.29 12 6.5 13.79 6.5 16C6.5 18.21 8.29 20 10.5 20C12.71 20 14.5 18.21 14.5 16V8H18V3H12Z" fill="white"/>
                      </svg>
                      <span>{{video.music}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Botões de navegação -->
            <div class="navigation-buttons">
              <button class="nav-button prev-button" @click="handlePrev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z" fill="white"/>
                </svg>
              </button>
              <button class="nav-button next-button" @click="handleNext">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="white"/>
                </svg>
              </button>
            </div>
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
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    width: calc(100% + 30px);
    height: calc(100% + 30px);
    filter: blur(25px) brightness(1.1);
    opacity: 0.7;
    z-index: 1;
    border-radius: 30px;
    object-fit: cover;
    transition: all 500ms ease-out;
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
  </style>

  <script>
  export default {
    name: 'ReelsPage',
    data() {
      return {
        videos: [
          {
            id: 1,
            title: "Sky Block",
            url: require("@/assets/blue.mp4"),
            showText: true,
            likes: "4",
            comments: "25",
            description: "Minha mansão do Sky Block",
            music: "A música vinculada vai aqui",
            userAvatar: ""
          },
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
        
        // Mostra o blur imediatamente com opacidade inicial
        blurVideoElement.style.opacity = "0.7";
        blurVideoElement.style.filter = "blur(25px) brightness(1.1)";
        
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
        this.startProgress(); // Chamada corrigida
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
          this.colorTransition += 0.03; // Transição mais lenta
        }
        
        // Interpolação suave entre cores
        this.currentColor = [
          Math.round(this.currentColor[0] + (this.targetColor[0] - this.currentColor[0]) * 0.05),
          Math.round(this.currentColor[1] + (this.targetColor[1] - this.currentColor[1]) * 0.05),
          Math.round(this.currentColor[2] + (this.targetColor[2] - this.currentColor[2]) * 0.05)
        ];
        
        // Calcula intensidade baseada no brilho
        const brightness = this.calculateBrightness(this.currentColor);
        const intensity = Math.min(0.8, brightness / 255 * 0.9);
        
        // Aplica o efeito com transição suave
        blurVideoElement.style.opacity = 0.6 + (intensity * 0.4);
        blurVideoElement.style.filter = `
          blur(95px)
          brightness(${1 + intensity * 0.3})
          drop-shadow(0 0 20px rgba(${this.currentColor[0]}, ${this.currentColor[1]}, ${this.currentColor[2]}, ${intensity * 0.1}))
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