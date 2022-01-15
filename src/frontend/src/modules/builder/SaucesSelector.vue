<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <Sauce
      v-for="sauce in sauces"
      :key="sauce.id"
      :data="selected"
      :sauce="sauce"
      @add-item="addItem"
    />
  </div>
</template>

<script>
import Sauce from "@/common/components/builder/Sauce";
export default {
  name: "SaucesSelector",
  components: {
    Sauce,
  },
  props: {
    sauces: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    addItem(payload) {
      this.$emit("add-item", payload, "sauce");
    },
  },
};
</script>
