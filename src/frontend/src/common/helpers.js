import resources from "@/common/enums/resource.js";
import {
  AuthApiService,
  //CrudApiService,
  ReadOnlyApiService,
  PizzaApiService,
} from "@/services/api.service";

export const createResources = (notifier) => {
  return {
    [resources.USERS]: new ReadOnlyApiService(resources.USERS, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.PIZZA]: new PizzaApiService(notifier),
    [resources.PROFILE]: new PizzaApiService(notifier),
    [resources.ORDERS]: new PizzaApiService(notifier),
  };
};
