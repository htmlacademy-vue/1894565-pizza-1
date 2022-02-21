<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img src="img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40" />
    </router-link>

    <router-link
      v-for="item in menu"
      :key="item.id"
      class="layout__link"
      :class="$route.name === item.link ? 'layout__link--active' : ''"
      :to="{ name: item.link }"
      >{{ item.name }}</router-link
    >
  </div>
</template>

<script>
export default {
  name: "SideBarProfile",

  data() {
    return {
      menu: [
        {
          id: 1,
          name: "История заказов",
          link: "Orders",
        },
        {
          id: 2,
          name: "Мои данныев",
          link: "Profile",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
