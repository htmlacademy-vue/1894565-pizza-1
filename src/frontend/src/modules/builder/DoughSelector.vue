<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <dough
          v-for="dough in doughs"
          :key="dough.id"
          :data="selected"
          :dough="dough"
          @add-item="addItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Dough from "@/common/components/builder/Dough";
export default {
  name: "DoughSelector",
  components: {
    Dough,
  },
  props: {
    doughs: {
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
      this.$emit("add-item", payload, "dough");
    },
  },
};
</script>

<style scoped></style>
