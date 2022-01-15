<template>
  <label class="radio ingredients__input">
    <input
      type="radio"
      v-model="selected"
      name="sauce"
      :value="sauce"
      @change="addItem"
    />
    <span>{{ sauce.name }}</span>
  </label>
</template>

<script>
export default {
  name: "Sauce.vue",
  props: {
    sauce: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selected: this.data,
    };
  },

  methods: {
    addItem() {
      this.$emit("add-item", this.selected);
    },
  },
};
</script>

<style scoped></style>
