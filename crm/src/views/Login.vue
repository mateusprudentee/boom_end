<template>
  <div class="container" style="margin-top: 40px;">
    <div class="login">
      <div class="login-img"></div>

      <div class="login-direito">
        <div class="login-title">
          <p>Acesso rápido</p>
          <p id="entre">Entre ou registre-se no portal.</p>
        </div>

        <div class="campos">
          <q-input
            outlined
            name="email"
            v-model="loginIdentifier"
            label="Insira seu e-mail"
            @keyup.enter="handleAction"
          />
          <q-input
            outlined
            name="password"
            v-model="password"
            style="margin-top: 10px;"
            label="Digite sua senha"
            :type="showPassword ? 'text' : 'password'"
            @keyup.enter="handleAction"
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

          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

          <q-btn
            :disabled="!loginIdentifier || !password"
            color="primary"
            style="margin-top: 10px; width: 100%;"
            :label="isRegistering ? 'Registrar' : 'Entrar'"
            @click="handleAction"
          />
          <q-btn
            flat
            color="primary"
            style="margin-top: 10px; width: 100%;"
            label="NÃO TEM CONTA? REGISTRE-SE"
            @click="toggleRegisterMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Notify } from "quasar";

export default {
  name: "LoginPage",
  data() {
    return {
      loginIdentifier: "",
      password: "",
      showPassword: false,
      isRegistering: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleAction() {
      if (this.isRegistering) {
        this.handleRegister();
      } else {
        this.handleLogin();
      }
    },
    toggleRegisterMode() {
      this.$router.push("/register");
    },
    handleLogin() {
  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      loginIdentifier: this.loginIdentifier,
      password: this.password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Exibe a notificação de sucesso
        Notify.create({
          type: "positive",
          message: "Login realizado com sucesso!",
          position: "bottom",
          timeout: 3000,
        });

        // Salva o ID, username e email no localStorage
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("username", data.user.username);

        // Redireciona para a página inicial
        this.$router.push("/");

        // Aguarda 10ms antes de recarregar a página
        setTimeout(() => {
          window.location.reload();
        }, 10);
      } else {
        // Exibe notificação de erro
        Notify.create({
          type: "negative",
          message: "Usuário ou senha inválidos.",
          position: "bottom",
          timeout: 3000,
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);

      // Exibe notificação de erro genérico
      Notify.create({
        type: "negative",
        message: "Erro ao conectar com o servidor.",
        position: "bottom",
        timeout: 3000,
      });
    });
}
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

.error-message {
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
