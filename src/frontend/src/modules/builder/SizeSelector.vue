<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <size
          v-for="item in sizes"
          :key="item.id"
          :size="item"
          :data="selected.size"
          @add-item="addItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Size from "@/common/components/builder/Size";

export default {
  name: "SizeSelector",
  components: { Size },
  props: {
    sizes: {
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
      this.$emit("add-item", payload, "size");
    },
  },
};
</script>

<style scoped></style>
