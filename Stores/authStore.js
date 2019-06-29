import { decorate, observable } from "mobx";
import axios from "axios";
import { AsyncStorage } from "react-native";
import jwt_decode from "jwt-decode";
// import { withNavigation } from "react-navigation";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

class AuthStore {
  constructor() {
    this.user = null;
    this.spots = [];
    this.loading = true;
    this.checkForToken();
  }

  setCurrentUser(token) {
    if (token) {
      return AsyncStorage.setItem("jwtToken", token).then(() => {
        axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
        const decodedUser = jwt_decode(token);
        this.user = decodedUser;
        this.loading = false;
      });
    } else {
      return AsyncStorage.removeItem("jwtToken").then(() => {
        delete axios.defaults.headers.common["Authorization"];
        this.user = null;
        this.spots = null;
        this.loading = false;
      });
    }
  }

  registerUser(userData, navigation) {
    console.log(userData);
    instance
      .post("signup/", userData)
      .then(res => {
        this.loginUser(userData, navigation);
      })
      .catch(err => console.log(err));
  }

  loginUser(userData, navigation) {
    instance
      .post("signin/", userData)
      .then(res => res.data)
      .then(user => this.setCurrentUser(user.token))
      .then(() => {
        this.getMySpot();
        navigation.navigate("RestaurantList");
      })
      .catch(err => console.error(err));
  }

  logoutUser(navigation) {
    this.setCurrentUser();
    () => navigation.replace("RestaurantList");
  }

  checkForToken = () => {
    AsyncStorage.getItem("jwtToken")
      .then(token => {
        if (token) {
          const currentTime = Date.now() / 1000;

          const user = jwt_decode(token);

          if (user.exp >= currentTime) {
            this.setCurrentUser(token);
          } else {
            this.logoutUser();
          }
        }
      })
      .catch(err => console.error(err));
  };

  getMySpot() {
    instance
      .get("queue/list/")
      .then(res => res.data)
      .then(spots => (this.spots = spots))
      .catch(err => console.error(err));
  }
}

decorate(AuthStore, {
  user: observable,
  spots: observable,
  loading: observable
});

export default new AuthStore();
