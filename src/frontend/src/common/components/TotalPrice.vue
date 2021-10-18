<template>
  <div class="content__result">
    <p>Итого: {{ total }} ₽</p>
    <button type="button" class="button" @click="submit" :disabled="!button">
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "totalPrice",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
  },
};
</script>
