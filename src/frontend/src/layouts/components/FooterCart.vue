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
      <button @click="sendOrder" :disabled="!isValidOrder" class="button">
        Оформить заказ
      </button>
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
    pizzas: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState({
      id: (state) => state.auth.me.id,
    }),
    isValidOrder() {
      if (this.pizzas.length === 0) {
        return false;
      }

      if (this.orderInfo.id === "new_address") {
        if (!this.orderInfo.street || !this.orderInfo.building) {
          return false;
        }
      }
      return true;
    },
  },

  methods: {
    sendOrder() {
      this.$store.dispatch("sendOrder", this.id);
    },
  },
};
</script>

<style scoped></style>
