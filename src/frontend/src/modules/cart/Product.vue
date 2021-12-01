<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Капричоза"
      />
      <div class="product__text">
        <h2>{{ data.title }}</h2>
        <ul>
          <li>
            {{ `${data.size.name}, ${data.dough.name.toLowerCase()} тесто` }}
          </li>
          <li>Соус: {{ data.sauce.name.toLowerCase() }}</li>
          <li>Начинка: {{ ingredientsList }}</li>
        </ul>
      </div>
    </div>

    <quantity-selection
      :index="index"
      @manual-change="manualChange"
      @reduce-number="reduceNumber"
      @increase-number="increaseNumber"
      :obj="pizza"
      field="quantity"
    />

    <div class="cart-list__price">
      <b>{{ data.total_price }} ₽</b>
    </div>

    <router-link :to="`/pizza/${data.id}`">
      <div class="cart-list__button">
        <button type="button" class="cart-list__edit">Изменить</button>
      </div>
    </router-link>
  </li>
</template>

<script>
import QuantitySelection from "@/common/components/cart/QuantitySelection";
export default {
  name: "Product",
  components: {
    QuantitySelection,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      pizza: this.data,
    };
  },

  mounted() {
    this.$store.dispatch("priceUpdate", {
      index: this.index,
      field: "products",
    });
  },

  computed: {
    ingredientsList() {
      return this.data.ingredients
        .map((item) => item.name)
        .join(", ")
        .toLowerCase();
    },
  },

  methods: {
    manualChange(payload) {
      payload.field = "products";
      this.$emit("manual-change", payload);
    },
    increaseNumber(payload) {
      payload.field = "products";
      this.$emit("increase-number", payload);
    },
    reduceNumber(payload) {
      payload.field = "products";
      this.$emit("reduce-number", payload);
    },
  },
};
</script>

<style scoped></style>
