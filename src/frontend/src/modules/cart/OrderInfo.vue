<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          style="width: 180px"
          v-model="data.receiving"
        >
          <option v-for="option in receiving_options" :key="option.id">
            {{ option.text }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          v-model="data.phone"
          name="tel"
          placeholder="+7 999-999-99-99"
        />
      </label>

      <div v-if="data.receiving === 'Новый адрес'" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" v-model="data.street" name="street" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" v-model="data.house" name="house" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" v-model="data.apartment" name="apartment" />
          </label>
        </div>
      </div>
      <h3 v-if="data.receiving === 'Существующий адрес'">
        TODO: адрес, который пользователь добавил в личном кабинете
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderInfo",
  props: {
    contact: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data: this.contact,
      receiving_options: [
        {
          id: 1,
          text: "Заберу сам",
        },
        {
          id: 2,
          text: "Новый адрес",
        },
        {
          id: 3,
          text: "Существующий адрес",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
