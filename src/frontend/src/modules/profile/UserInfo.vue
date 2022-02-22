<template>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        srcset="img/users/user5@2x.webp 1x, img/users/user5@4x.webp 2x"
      />
      <img
        src="img/users/user5@2x.jpg"
        srcset="img/users/user5@4x.jpg"
        :alt="me.name"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>{{ me.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ me.phone }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    me: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped></style>
