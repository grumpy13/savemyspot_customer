import axios from "axios";
import { decorate, observable, computed } from "mobx";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

class RestaurantStore {
  constructor() {
    this.restaurants = [];
    this.restaurant = {};
    this.loading = true;
    this.restaurantLoading = true;
    this.query = "";
  }

  fetchAllRestaurants() {
    instance
      .get("restaurant/list/")
      .then(res => res.data)
      .then(restaurant => {
        this.restaurants = restaurant;
      })
      .catch(err => console.error(err));
  }

  fetchARestaurant(restaurantID) {
    instance
      .get(`restaurant/detail/${restaurantID}`)
      .then(res => res.data)
      .then(restaurant => {
        this.restaurant = restaurant;
        this.loading = false;
      })
      .catch(err => console.error(err));
  }

  get filteredRestaurants() {
    return this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(this.query.toLowerCase())
    );
  }
}

decorate(RestaurantStore, {
  restaurants: observable,
  restaurant: observable,
  loading: observable,
  restaurantLoading: observable,
  query: observable,
  filteredRestaurants: computed
});

export default new RestaurantStore();
