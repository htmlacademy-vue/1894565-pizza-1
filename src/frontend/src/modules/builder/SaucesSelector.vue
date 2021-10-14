<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      class="radio ingredients__input"
      v-for="(sauce, i) in sauces"
      :key="i"
    >
      <input
        type="radio"
        @change="addItem"
        v-model="selected"
        name="sauce"
        :value="sauce"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "SaucesSelector",
  props: {
    sauces: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selected: this.sauces[0],
    };
  },
  mounted() {
    this.addItem();
  },
  methods: {
    addItem() {
      this.$emit("add-item", this.selected, "sauce");
    },
  },
};
</script>

<style scoped></style>
