<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <size
          v-for="size in sizes"
          :key="size.id"
          :default="sizes[0]"
          :size="size"
          @add-item="addItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Size from "@/common/components/Size";
export default {
  name: "SizeSelector",
  components: { Size },
  props: {
    sizes: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.addItem();
  },
  methods: {
    addItem(selected) {
      this.$emit("add-item", selected || this.sizes[0], "size");
    },
  },
};
</script>

<style scoped></style>
