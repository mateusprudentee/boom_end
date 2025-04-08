<template>
  <div class="pagina">
    <div class="container">
      <div class="tudo">
      <div class="imagem">
        <div class="card-bottom">
          <div class="vip">
            <p>A partir de R$ 90,90/mês ou R$ 1.500</p>
          </div>
          <div class="vip-desc">
            <p>Acoplado com sistema de Inteligência Artificial</p>
          </div>
          <div class="quero-comprar">
            <button>Comprar o melhor VIP</button>
          </div>
        </div>
      </div>
        </div>

        <div class="flex-topico">
        <div class="topico-latest">
          <div class="flex-topico">
          <div class="skin"><img src="https://cravatar.eu/helmavatar/reaperxzz/64" width="60" height="60" alt="[IMG]"></div>
          <div class="topico-title">
            <p>{{ topicData.title }}</p>
            <div class="topico-subtitle">
            <p>{{  topicData.subtitle }}</p>
          </div>
        </div>
          </div>
          <div class="linha"></div>
         <div class="text-topico">
          <p> {{ topicData.content }}</p>
          </div>
        </div>

        <div class="topico-direito">
          <p>Últimas novidades</p>
          <div v-for="(item, index) in newsItems" :key="index" class="topico-direito-itens">
          <q-icon :name="item.icon"></q-icon> {{ item.text }}
         </div>
        </div>

        </div>
        <div class="footer-card">
          A BOOM não é, de maneira alguma, afiliada à ou endossada pela Mojang.
          <div class="footer-opcoes">
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
}
.footer-card {
  width:100%;
  height: 70px;
  padding: 1em;
  color: rgba(255, 255, 255, 0.575);
  margin-top: 50px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: #ffffff07;
}
.topico-direito-itens {
  font-weight: normal;
  color: rgb(168, 168, 168);
  font-size: 16px;
}
.topico-direito {
  color: white;
  font-weight: bold;
  padding: 1em;
  text-align: left;
  background:rgba(128, 128, 128, 0.055);
  width: 300px;
  border-radius: 20px;
  margin-top: 30px;
  font-size: 20px;
}
.flex-topico {
  display: flex;
  gap: 10px;
}
.skin {
  padding: 1.5em;
}
.text-topico {
  font-weight: normal;
  text-align: left;
  padding: 1.5em;
  font-size: 14px;
  color: gray;
}
.linha {
  width: 100%;
  margin-top: -10px;
  height: 1px;
  background: rgba(128, 128, 128, 0.103);
}
.topico-subtitle {
  font-weight: normal;
  font-size: 15px;
  color: gray;
  margin-top: -17px;
}
.topico-title { 
  color: white;
  font-weight: bold;
  padding-top: 1.3em;
  font-size: 20px;
  text-align: left;
}
.topico-latest {
  width: 850px;
  height: 100%;
  margin-top: 30px;
  border-radius: 20px;
  background: rgba(128, 128, 128, 0.055);
}

.tudo {
  border-radius: 20px;
  border: 1px solid rgba(128, 128, 128, 0.13);
}
.imagem {
  position: relative;
  background-image: url("https://i.imgur.com/kkiSA1V.png");
  width: 100%;
  height: 500px;
  box-shadow: inset 1px -370px 590px black;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.card-bottom {
  margin-top: 349px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.438);
  box-shadow: 1px -10px 679px black;
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
  margin-top: -10px;
}

button:hover {
  background: rgb(102, 0, 0);
  transform: translateY(-2px);
  margin-top: -10px;
}

.vip {
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.vip-desc {
  font-size: 17px;
  margin-top: -18px;
  color: #ccc;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
.pagina {
  background-color: #000;
  min-height: 100vh; 
  margin: 0;
  margin-top: -80px;
  padding: 130px 0 0 0; 
}

.container {
  width: 1150px;
  font-family: 'Ubuntu', sans-serif;
  margin: 0 auto;
  text-align: center;
  background-color: #000;
  padding-bottom: 20px; 
}

body {
  margin: 0;
  padding: 0;
  background-color: #000; 
}
</style>

<script>
export default {
  name: 'InicioPage',
  setup() {
    const topicData = {
      title: "RankUP Boom",
      subtitle: "Postado em 'Geral' por reaperxzz",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec porttitor lorem. Fusce sit amet iaculis odio. Mauris ut sem cursus, pretium dolor at, malesuada velit. Integer non ipsum vel mi ornare pellentesque. Curabitur lobortis metus leo, non pulvinar velit tristique ut. Integer ac consequat quam, ut viverra purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc at auctor leo. Nunc dignissim suscipit ligula et ullamcorper.

Phasellus et mi ipsum. Nunc dignissim mattis ante et consequat. Aliquam eget sem dui. Fusce bibendum volutpat volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis a turpis volutpat, dapibus est et, facilisis massa. Nullam sit amet suscipit risus, in auctor nulla. Aenean elementum lacus lectus, vel scelerisque eros elementum eget. Fusce lacinia feugiat leo vel lobortis. Duis ultricies tortor ac odio convallis facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Curabitur ac sapien molestie odio vehicula pharetra. Morbi a auctor justo, sit amet lobortis neque. Pellentesque lacinia aliquet dapibus. Maecenas vitae tincidunt massa. Etiam eleifend turpis a lectus cursus interdum. In tellus neque, varius eu dapibus ac, accumsan a massa. Curabitur sagittis libero quis ante vestibulum, a tristique nisl efficitur. Nulla tellus enim, gravida bibendum semper nec, placerat sed purus.`
    };

    const newsItems = [
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" },
      { icon: "event_available", text: "RankUP aberto ao público!" }
    ];

    return {
      topicData,
      newsItems
    };
  }
}
</script>