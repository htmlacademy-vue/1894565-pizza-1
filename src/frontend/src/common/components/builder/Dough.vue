<template>
  <label :class="`dough__input dough__input--${doughClass(dough.name)}`">
    <input
      v-model="selected"
      type="radio"
      name="dough"
      :value="dough"
      class="visually-hidden"
      @change="addItem"
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
