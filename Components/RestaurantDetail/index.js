import React, { Component } from "react";
import { observer } from "mobx-react";
import axios from "axios";

// import { HeaderBackButton } from "react-navigation";
import { Container, Content } from "native-base";
import { ScrollView } from "react-native";

//Components
import Queue from "../Queue";
import Menu from "../Menu";

//Stores
import restaurantStore from "../../Stores/restaurantStore";

const instance = axios.create({
  baseURL: "http:127.0.0.1:8000/"
});

class RestaurantDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      loading: true,
      currentQ: 0,
      position: null,
      guests: null,
      restaurantID: this.props.navigation.getParam("restaurant", {}).id
    };
  }

  componentDidMount() {
    this.fetchARestaurant();
    restaurantStore.fetchARestaurant(this.state.restaurantID);
  }

  fetchARestaurant() {
    instance
      .get("restaurant/detail/" + this.state.restaurantID)
      .then(res => res.data)
      .then(restaurant =>
        this.setState({ restaurant: restaurant, loading: false })
      )

      .catch(err => console.error(err));
  }

  handlePress() {
    this.props.navigation.navigate("Login");
  }

  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: navigation.getParam("restaurant", {}).name,
  //     headerLeft: (
  //       <HeaderBackButton
  //       onPress={...}
  //       />
  //     )
  //   };
  // };

  render() {
    const { restaurant, loading } = this.state;
    const res1 = restaurantStore.restaurant;
    if (loading) {
      return <Content />;
    } else {
      return (
        <ScrollView>
          <Container>
            <Queue restaurant={restaurant} />
            <Menu category={restaurant.category} />
          </Container>
        </ScrollView>
      );
    }
  }
}

export default observer(RestaurantDetail);
