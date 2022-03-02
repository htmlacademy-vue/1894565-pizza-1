<template>
  <transition appear name="popup" mode="out-in">
    <div class="popup">
      <router-link :to="pathLink" class="close">
        <span class="visually-hidden">Закрыть попап</span>
      </router-link>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <router-link :to="pathLink" class="button">Отлично, я жду!</router-link>
      </div>
    </div>
  </transition>
</template>

<script>
import jwt from "@/services/jwt.service";

export default {
  name: "ThanksOrder",
  computed: {
    pathLink() {
      return jwt.getToken() ? "/orders" : "/";
    },
  },
};
</script>

<style scoped>
.popup-enter-active {
  transition: all 0.4s;
}

.popup-enter {
  opacity: 0;
  margin-left: 700px;
}

.popup-leave-active {
  transition: all 1s;
  opacity: 0;
}
</style>
