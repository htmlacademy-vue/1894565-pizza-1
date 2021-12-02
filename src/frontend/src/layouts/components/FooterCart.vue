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
      <router-link :to="'/thanks-order'">
        <button type="submit" class="button">Оформить заказ</button>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "FooterCart",
  props: {
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped></style>
