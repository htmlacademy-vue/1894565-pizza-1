<template>
  <label :class="`dough__input dough__input--${doughClass(dough.name)}`">
    <input
      type="radio"
      name="dough"
      v-model="selected"
      :value="dough"
      @change="addItem"
      class="visually-hidden"
    />
    <b>{{ dough.name }}</b>
    <span>{{ dough.description }}</span>
  </label>
</template>

<script>
export default {
  name: "Dough.vue",
  props: {
    dough: {
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
    doughClass(name) {
      return name === "Толстое" ? "large" : "light";
    },
    addItem() {
      this.$emit("add-item", this.selected);
    },
  },
};
</script>

<style scoped></style>
