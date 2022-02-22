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
            @manual-change="manualChange"
            @reduce-number="reduceNumber"
            @increase-number="increaseNumber"
            :obj="product"
            field="quantity"
          />
          <div class="additional-list__price">
            <b>× {{ product.price }} ₽</b>
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
    productClass(href) {
      let arr = href.split("/");
      return arr[arr.length - 1];
    },
    manualChange(value) {
      this.$emit("manual-change", {
        field: "additional_products",
        quantity: value,
        index: this.index,
      });
    },
    increaseNumber() {
      this.$emit("increase-number", {
        field: "additional_products",
        index: this.index,
      });
    },
    reduceNumber() {
      this.$emit("reduce-number", {
        field: "additional_products",
        index: this.index,
      });
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
