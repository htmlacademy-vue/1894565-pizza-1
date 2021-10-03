<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                  :class="`dough__input dough__input--${doughClass(
                    dough.name
                  )}`"
                  v-for="(dough, i) in pizza.dough"
                  :key="i"
                >
                  <input
                    type="radio"
                    name="dought"
                    value="light"
                    class="visually-hidden"
                    checked
                  />
                  <b>{{ dough.name }}</b>
                  <span>{{ dough.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  :class="`diameter__input diameter__input--${sizeClass(
                    size.multiplier
                  )}`"
                  v-for="(size, i) in pizza.sizes"
                  :key="i"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="sizeClass(size.multiplier)"
                    class="visually-hidden"
                  />
                  <span>{{ size.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <label
                    class="radio ingredients__input"
                    v-for="(sauce, i) in pizza.sauces"
                    :key="i"
                  >
                    <input type="radio" name="sauce" :value="sauce.id" />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      class="ingredients__item"
                      v-for="(ingredient, i) in pizza.ingredients"
                      :key="i"
                    >
                      <span
                        :class="
                          `filling filling--` +
                          ingredientClass(ingredient.image)
                        "
                        >{{ ingredient.name }}</span
                      >

                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="counter__button counter__button--minus"
                          :disabled="ingredient.quantity < 1"
                          @click="removeIngredient(ingredient)"
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          v-model="ingredient.quantity"
                          type="text"
                          name="counter"
                          class="counter__input"
                          min="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                          @click="addIngredient(ingredient)"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">{{ title }}</span>
              <input
                type="text"
                v-model="title"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";

export default {
  name: "Index.vue",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    pizza,
  },
  data() {
    return {
      title: "",
      pizza: pizza,
    };
  },
  mounted() {
    this.pizza.ingredients.forEach((item) => {
      this.$set(item, "quantity", 1);
    });
    console.log(this.pizza);
  },
  methods: {
    ingredientClass(href) {
      let arr = href.split("/");
      arr = arr[arr.length - 1].split(".");
      return arr[0];
    },

    doughClass(name) {
      return name === "Толстое" ? "large" : "light";
    },

    sizeClass(multiplier) {
      if (multiplier === 1) return "small";
      if (multiplier === 2) return "normal";
      if (multiplier === 3) return "big";
    },

    removeIngredient(ingredient) {
      if (ingredient.quantity >= 1) ingredient.quantity--;
    },
    addIngredient(ingredient) {
      ingredient.quantity++;
    },
  },
};
</script>

<style lang="scss" scoped></style>
