import { sumBy } from "lodash";

export function calculateCostOfPizza(pizza) {
  let sumIngredients = 0;
  let sauce = pizza.sauce.price;
  let dough = pizza.dough.price;
  let sizeMultiplier = pizza.size.multiplier;

  for (let i = 0; i < pizza.ingredients.length; i++) {
    sumIngredients +=
      pizza.ingredients[i].price * pizza.ingredients[i].quantity;
  }

  return (sumIngredients + sauce + dough) * sizeMultiplier;
}

export function calculateCostOfMisc(misc) {
  return sumBy(misc, () => misc.price * misc.quantity);
}
