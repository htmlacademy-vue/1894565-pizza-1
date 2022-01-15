<template>
  <div>
    <Address
      v-for="(address, index) in addresses"
      :key="address.id"
      :index="index"
      :data="address"
      @delete-address="deleteAddress(address.id)"
      @edit-address="editAddress"
      @switch-edit-mode-addresses="switchEditModeAddresses(index)"
    />

    <div class="layout__address">
      <form
        action="test.html"
        method="post"
        class="address-form address-form--opened sheet"
      >
        <div class="address-form__header">
          <b>Новый адрес</b>
        </div>

        <div class="address-form__wrapper">
          <div class="address-form__input">
            <label class="input">
              <span>Название адреса*</span>
              <input
                type="text"
                name="addr-name"
                placeholder="Введите название адреса"
                required
                v-model="form.name"
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
                v-model="form.street"
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
                v-model="form.building"
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
                v-model="form.flat"
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
                v-model="form.comment"
              />
            </label>
          </div>
        </div>
        <div class="layout__button">
          <button @click="addAddress" class="button button--border">
            Добавить новый адрес
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Address from "../../common/components/profile/Address";
import { mapState } from "vuex";
export default {
  name: "Addresses",
  components: {
    Address,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState({
      addresses: (state) => state.auth.addresses,
    }),
  },

  data() {
    return {
      form: {
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
    };
  },

  methods: {
    addAddress() {
      this.$store
        .dispatch("createAddress", {
          userId: this.userId,
          ...this.address,
        })
        .then(() => {
          this.address = {
            name: "",
            street: "",
            building: "",
            flat: "",
            comment: "",
          };
          this.$store.dispatch("addresses");
        });
    },
    deleteAddress(id) {
      this.$store.dispatch("deleteAddress", id).then(() => {
        this.$store.dispatch("addresses");
      });
    },
    editAddress(address) {
      this.$store.dispatch("editAddress", address).then(() => {
        this.$store.dispatch("addresses");
      });
    },
  },
};
</script>

<style scoped></style>
