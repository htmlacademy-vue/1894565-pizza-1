<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="data[field] < 1"
      @click="reduceNumber"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="data[field]"
      @change="manualChange"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="increaseNumber"
      :disabled="data[field] >= limit"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "QuantitySelection",

  props: {
    obj: {
      type: Object,
      required: () => {},
    },
    limit: {
      type: Number,
      default: 20,
    },
    field: {
      type: String,
      required: "",
    },
  },
  data() {
    return {
      data: this.obj,
    };
  },

  methods: {
    // Контролируем количество у текущего элемента, если его изменили в ручную
    manualChange(event) {
      this.$emit("manual-change", event.target.value);
    },
    //отнять
    reduceNumber() {
      this.$emit("reduce-number");
    },
    //прибавить
    increaseNumber() {
      this.$emit("increase-number");
    },
  },
};
</script>
