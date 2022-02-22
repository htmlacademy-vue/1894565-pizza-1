<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form method="post">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            v-model="email"
            placeholder="example@mail.ru"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            type="password"
            name="pass"
            v-model="password"
            placeholder="***********"
          />
        </label>
      </div>
      <button class="button" :disabled="!isValid" @click="login">
        Авторизоваться
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    isValid() {
      return this.email && this.password;
    },
  },

  methods: {
    login(event) {
      event.preventDefault();
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res) {
            this.$store.dispatch("me");
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style scoped></style>
