import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  // запрос на создание сущности
  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  // запрос на обновление сущности
  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  // запрос на удаление сущности
  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

// наследуемся от BaseApiService, так как класс не подразумевает CRUD операции
export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    // передаём notifier для использования в родительском конструкторе
    super(notifier);
  }

  // задаём токен авторизации
  setAuthHeader() {
    // получаем токен из LocalStorage с помощью JWT-сервиса
    const token = JwtService.getToken();
    // добавляем заголовок авторизации в axios как Bearer token
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    // отправляем логин/пароль для авторизации на сервере
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    // делаем логаут на сервере
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    // получаем профиль залогиненного пользователя
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

// Наследуемся от CRUD API-сервиса
export class PizzaApiService extends CrudApiService {
  constructor(notifier) {
    super("pizza", notifier);
  }

  async ingredients(config = {}) {
    return await axios.get(`ingredients`, config);
  }

  async sizes(config = {}) {
    return await axios.get(`sizes`, config);
  }

  async sauces(config = {}) {
    return await axios.get(`sauces`, config);
  }

  async dough(config = {}) {
    return await axios.get(`dough`, config);
  }

  async misc(config = {}) {
    return await axios.get(`misc`, config);
  }

  async addresses(config = {}) {
    return await axios.get(`addresses`, config);
  }

  async address(id, config = {}) {
    const { data } = await axios.get(`addresses/${id}`, config);
    return data;
  }

  async addAddress(body) {
    await axios.post("addresses", body);
  }

  async updateAddress(address) {
    await axios.put(`addresses/${address.id}`, address);
  }

  async deleteAddress(id) {
    await axios.delete(`addresses/${id}`);
  }

  async addOrder(order) {
    await axios.post("orders", order);
  }

  async getOrders() {
    const { data } = await axios.get("orders");
    return data;
  }

  async deleteOrder(id) {
    await axios.delete(`orders/${id}`);
  }
}
