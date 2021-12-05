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
    [resources.PiZZAS]: new PizzaApiService(notifier),
    //   [resources.COLUMNS]: new CrudApiService(resources.COLUMNS, notifier),
    //   [resources.TICKS]: new CrudApiService(resources.TICKS, notifier),
    //   [resources.COMMENTS]: new CrudApiService(resources.COMMENTS, notifier),
  };
};
