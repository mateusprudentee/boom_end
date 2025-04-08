<template>
  <div class="container" style="margin-top: 40px;">
    <div class="login">
      <div class="login-img"></div>

      <div class="login-direito">
        <div class="login-title">
          <p>Bem-vindo,</p>
          <p id="entre">Registre-se no portal G.I.N</p>
        </div>

        <div class="campos">
          <q-input
            outlined
            v-model="email"
            label="Insira seu e-mail"
            type="email"
          />
          <q-input
            outlined
            v-model="username"
            style="margin-top: 10px;"
            label="Escolha um nome de usuário"
          />
          <q-input
            outlined
            v-model="password"
            style="margin-top: 10px;"
            label="Digite sua senha"
            :type="showPassword ? 'text' : 'password'"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="togglePasswordVisibility"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <q-input
            outlined
            v-model="confirmPassword"
            style="margin-top: 10px;"
            label="Confirme sua senha"
            :type="showPassword ? 'text' : 'password'"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="togglePasswordVisibility"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <p id="portal-join">
            Ao entrar no portal, você aceita que seus dados serão utilizados para fins de performance e qualidade, em cumprimento com a Lei Geral de Proteção de Dados (LGPD) e outras políticas de segurança.
          </p>

          <!-- Mensagem de sucesso (verde) exibida acima do botão -->
          <p v-if="successMessage" class="success-message" style="margin-top: -10px;">{{ successMessage }}</p>

          <q-btn
            :disabled="!email || !username || !password || password !== confirmPassword"
            color="primary"
            style="margin-top: 10px; width: 100%;"
            label="Registrar"
            @click="handleRegister"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      username: '', 
      password: '',
      confirmPassword: '',
      showPassword: false,
      successMessage: '', 
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleRegister() {
      if (this.email && this.username && this.password && this.password === this.confirmPassword) {
        fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            username: this.username, 
            password: this.password,
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.successMessage = 'Registro realizado com sucesso!'; 
            setTimeout(() => {
              this.$router.push('/login'); 
            }, 1000);
          } else {
            this.$q.notify({
              color: 'negative',
              message: 'Erro ao registrar: ' + data.error,
              icon: 'report_problem',
            });
          }
        })
        .catch((error) => {
          console.error('Erro ao registrar:', error);
          this.$q.notify({
            color: 'negative',
            message: 'Erro ao conectar com o servidor.',
            icon: 'report_problem',
          });
        });
      }
    },
  },
};
</script>
  <style scoped>
  #portal-join {
    margin-top: 13px;
    color: gray;
    font-size: 11px;
    text-align: left;
  }
  
  .campos {
    text-align: center;
    margin-top: -20px;
    padding: 1em;
  }
  
  #entre {
    font-size: 14px;
    color: gray;
    margin-top: -19px;
  }
  
  .login-title {
    text-align: left;
    padding: 0.5em;
    font-size: 30px;
    margin-top: 10px;
  }
  
  .login-direito {
    background: white;
    box-shadow: 1px 1px 10px rgb(224, 224, 224);
    width: 400px;
    border-radius: 0px 20px 20px 0px;
    height: 500px;
  }
  
  .login {
    padding: 1em;
    display: flex;
    margin: 0 auto;
    text-align: center;
  }
  
  .login-img {
    background-image: url("https://i.imgur.com/ier7UXQ.png");
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 1px 1px 10px rgb(224, 224, 224);
    width: 500px;
    border-radius: 20px 0px 0px 20px;
    height: 500px;
  }
  
  .success-message {
    color: green;
    font-weight: bold;
    margin-bottom: 10px;
  }
  </style>
  