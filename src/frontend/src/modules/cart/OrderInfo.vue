<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          @change="setDelivery"
          class="select"
          style="width: 180px"
          v-model="deliveryMethod"
        >
          <option
            v-for="option in receivingOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          v-model="phone"
          name="tel"
          @change="setDelivery"
          placeholder="+7 999-999-99-99"
        />
      </label>

      <div
        v-if="deliveryMethod.name === 'Новый адрес'"
        class="cart-form__address"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              @change="setDelivery"
              v-model="deliveryMethod.street"
              name="street"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              @change="setDelivery"
              v-model="deliveryMethod.building"
              name="building"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              @change="setDelivery"
              v-model="deliveryMethod.flat"
              name="flat"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import jwt from "@/services/jwt.service";
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
      phone: "",
      deliveryMethod: {
        id: "pickup",
        name: "Заберу сам",
      },
    };
  },

  computed: {
    ...mapState({
      addresses: (state) => state.auth.addresses,
    }),
    receivingOptions() {
      const default_options = [
        {
          id: "pickup",
          name: "Заберу сам",
        },
        {
          id: "new_address",
          name: "Новый адрес",
        },
      ];

      if (jwt.getToken()) {
        return [...default_options, ...this.addresses];
      } else {
        return default_options;
      }
    },
  },

  async created() {
    await this.$store.dispatch("addresses");
  },

  methods: {
    setDelivery() {
      this.$store.dispatch("setDelivery", {
        ...this.deliveryMethod,
        phone: this.phone,
      });
    },
  },
};
</script>

<style scoped></style>
