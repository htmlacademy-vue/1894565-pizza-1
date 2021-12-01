<template>
  <div>
    <ul>
      <li class="additional-list__item sheet">
        <p class="additional-list__description">
          <img
            :src="'/img/' + productClass(product.image)"
            width="39"
            height="60"
            :alt="product.name"
          />
          <span>{{ product.name }}</span>
        </p>

        <div class="additional-list__footer">
          <quantity-selection
            :index="index"
            @manual-change="manualChange"
            @reduce-number="reduceNumber"
            @increase-number="increaseNumber"
            :obj="product"
            field="quantity"
          />
          <div class="additional-list__price">
            <b>× 56 ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import QuantitySelection from "@/common/components/cart/QuantitySelection";

export default {
  name: "AdditionalProduct",
  components: {
    QuantitySelection,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      required: true,
    },
  },

  methods: {
    //обработчик селектора для иконки ингридиента
    productClass(href) {
      let arr = href.split("/");
      return arr[arr.length - 1];
    },
    manualChange(payload) {
      payload.field = "additional_products";
      this.$emit("manual-change", payload);
    },
    increaseNumber(payload) {
      payload.field = "additional_products";
      this.$emit("increase-number", payload);
    },
    reduceNumber(payload) {
      payload.field = "additional_products";
      this.$emit("reduce-number", payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.additional-list__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding: 10px;
}

.additional-list__footer * {
  margin: 0;
}
</style>
