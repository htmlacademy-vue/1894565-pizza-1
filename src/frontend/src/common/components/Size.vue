<template>
  <label
    :class="`diameter__input diameter__input--${sizeClass(size.multiplier)}`"
  >
    <input
      v-model="selected"
      type="radio"
      name="diameter"
      :value="size"
      @change="addItem"
      class="visually-hidden"
    />
    <span>{{ size.name }}</span>
  </label>
</template>

<script>
export default {
  name: "Size.vue",
  props: {
    size: {
      type: Object,
      default: () => {},
    },
    default: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selected: this.default,
    };
  },
  methods: {
    sizeClass(multiplier) {
      if (multiplier === 1) return "small";
      if (multiplier === 2) return "normal";
      if (multiplier === 3) return "big";
    },
    addItem() {
      this.$emit("add-item", this.selected);
    },
  },
};
</script>

<style scoped></style>
