<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>
      <user-info :me="me" />
      <addresses v-if="me.id" :user-id="me.id" />
    </div>
  </main>
</template>

<script>
import UserInfo from "../modules/profile/UserInfo";
import Addresses from "../modules/profile/Addresses";
import { mapState } from "vuex";

export default {
  name: "Profile",
  components: {
    UserInfo,
    Addresses,
  },
  computed: {
    ...mapState({
      me: (state) => state.auth.me,
    }),
  },
};
</script>

<style scoped></style>
