<template>
  <li v-if="product.quantity > 0">
    <img
      :src="'/img/' + productClass(product.image)"
      width="20"
      height="30"
      :alt="product.name"
    />
    <p>
      <span>{{ product.name }}</span>
      <b>{{ `${product.quantity}x${product.price} ₽` }}</b>
    </p>
  </li>
</template>

<script>
export default {
  name: "AdditionalProduct",
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    productClass(href) {
      let arr = href.split("/");
      return arr[arr.length - 1];
    },
  },
};
</script>

<style scoped></style>
