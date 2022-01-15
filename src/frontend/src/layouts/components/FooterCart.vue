<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow"
        >Хочу еще одну</router-link
      >
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <button @click="sendOrder" class="button">Оформить заказ</button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FooterCart",
  props: {
    totalPrice: {
      type: Number,
      default: 0,
    },
    orderInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      id: (state) => state.auth.me.id,
    }),
  },
  methods: {
    sendOrder() {
      this.$store.dispatch("sendOrder", this.id);
    },
  },
};
</script>

<style scoped></style>
