<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №{{ index + 1 }}. {{ data.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="isEdit = !isEdit">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ data.street }}, д. {{ data.building }}, кв. {{ data.flat }}</p>
      <small>{{ data.comment }}</small>
      <div v-if="isEdit">
        <div class="address-form__wrapper">
          <div class="address-form__input">
            <label class="input">
              <span>Название адреса*</span>
              <input
                type="text"
                name="addr-name"
                placeholder="Введите название адреса"
                required
                v-model="address.name"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Улица*</span>
              <input
                type="text"
                name="addr-street"
                placeholder="Введите название улицы"
                required
                v-model="address.street"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Дом*</span>
              <input
                type="text"
                name="addr-house"
                placeholder="Введите номер дома"
                required
                v-model="address.building"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <input
                type="text"
                name="addr-apartment"
                placeholder="Введите № квартиры"
                v-model="address.flat"
              />
            </label>
          </div>
          <div class="address-form__input">
            <label class="input">
              <span>Комментарий</span>
              <input
                type="text"
                name="addr-comment"
                placeholder="Введите комментарий"
                v-model="address.comment"
              />
            </label>
          </div>
        </div>
        <div class="address-form__buttons">
          <button
            type="button"
            @click="deleteAddress"
            class="button button--transparent"
          >
            Удалить
          </button>
          <button type="submit" class="button" @click="editAddress">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  name: "Address",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      address: cloneDeep(this.data),
    };
  },
  methods: {
    deleteAddress() {
      this.$emit("delete-address");
    },

    editAddress() {
      this.$emit("edit-address", this.address);
    },
  },
};
</script>

<style scoped></style>
