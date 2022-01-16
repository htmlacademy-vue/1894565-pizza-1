<template>
  <section class="sheet order" v-if="order.orderAddress">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: 1250 ₽</span>
      </div>

      <div class="order__button">
        <button type="button" class="button button--border">Удалить</button>
      </div>
      <div class="order__button">
        <button type="button" class="button">Повторить</button>
      </div>
    </div>

    <ul class="order__list">
      <Pizza
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        :pizza="pizza"
      />
    </ul>

    <ul class="order__additional">
      <li>
        <img
          src="img/cola.svg"
          width="20"
          height="30"
          alt="Coca-Cola 0,5 литра"
        />
        <p>
          <span>Coca-Cola 0,5 литра</span>
          <b>56 ₽</b>
        </p>
      </li>
      <li>
        <img src="img/sauce.svg" width="20" height="30" alt="Острый соус" />
        <span>Острый соус <br />30 ₽</span>
      </li>
      <li>
        <img
          src="img/potato.svg"
          width="20"
          height="30"
          alt="Картошка из печи"
        />
        <p>
          <span>Картошка из печи</span>
          <b>170 ₽</b>
        </p>
      </li>
    </ul>
    <p class="order__address">Адрес доставки: {{ order.orderAddress.name }}</p>
  </section>
</template>

<script>
import Pizza from "@/common/components/orders/Pizza";
export default {
  name: "Card",
  components: {
    Pizza,
  },
  props: {
    order: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped></style>
