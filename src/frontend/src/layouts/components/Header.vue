<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="cart">{{ totalPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link to="/profile" v-if="me.id">
        <img :src="me.avatar" alt="Василий Ложкин" width="32" height="32" />
        <span>
          {{ me.name }}
        </span>
      </router-link>
      <router-link v-if="!isAuthUser" to="login" class="header__login"
        ><span>Войти</span></router-link
      >
      <div v-else @click="logout" class="header__login">
        <span>Выйти</span>
      </div>
    </div>
  </header>
</template>

<script>
import jwt from "../../services/jwt.service";
import { mapState } from "vuex";

export default {
  name: "Header",
  props: {
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState({
      me: (state) => state.auth.me,
    }),

    isAuthUser() {
      return jwt.getToken();
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then((res) => {
        console.log(res);
        this.$router.push("/login").then(() => {});
      });
    },
  },
};
</script>

<style scoped>
.header__login {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
