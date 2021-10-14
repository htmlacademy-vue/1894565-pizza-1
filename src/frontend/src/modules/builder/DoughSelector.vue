<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <dough
          v-for="dough in doughs"
          :key="dough.id"
          :dough="dough"
          :default="doughs[0]"
          @add-item="addItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Dough from "@/common/components/Dough";

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
  },
  mounted() {
    this.addItem();
  },
  methods: {
    addItem(selected) {
      this.$emit("add-item", selected || this.doughs[0], "dough");
    },
  },
};
</script>

<style scoped></style>
