<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img src="img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40" />
    </router-link>

    <router-link class="layout__link layout__link--active" to="orders"
      >История заказов</router-link
    >
    <router-link class="layout__link" to="profile">Мои данные</router-link>
  </div>
</template>

<script>
export default {
  name: "SideBarProfile",
};
</script>

<style scoped></style>
