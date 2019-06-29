import React, { Component } from "react";
import { observer } from "mobx-react";
import { withNavigation } from "react-navigation";

//Components
import Spinner from "./spinner.js";

//Stores
import authStore from "../../Stores/authStore";
import socket from "../../Stores/socketStore";

import styles from "./styles";

import { Button, Item, Text, View } from "native-base";
import { Image, TouchableOpacity } from "react-native";

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQ: null,
      position: null
    };
  }
  restaurantRequest() {
    if (authStore.user) {
      socket.getRestaurant(this.props.restaurant, authStore.user.user_id);
    } else {
      socket.getRestaurant(this.props.restaurant, null);
    }
  }

  componentDidMount() {
    this.restaurantRequest();
    socket.socket.on("q info", data => {
      this.setState({ currentQ: data.restaurantQ });
    });

    socket.socket.on("user spot", data => {
      this.setState({ position: data.spot });
    });
  }

  componentWillUnmount() {
    socket.socket.off("q info");
    socket.socket.off("user spot");
    socket.socket.off("update queue");
  }

  getQueueNumber() {
    if (this.state.position) {
      return (
        <>
          <Text style={styles.circleText}>{this.state.position.position}</Text>
          <Text style={styles.circleTextColor}>My spot</Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.circleText}>{this.state.currentQ}</Text>
          <Text style={styles.circleTextColor}>in queue</Text>
        </>
      );
    }
  }

  getQueueOptions() {
    if (authStore.user !== null) {
      if (this.state.position) {
        return (
          <Button
            rounded
            light
            style={styles.queueButtons}
            onPress={() => this.leaveQ()}
          >
            <Text style={styles.white}>Leave Q</Text>
          </Button>
        );
      } else {
        return (
          <Spinner
            user={authStore.user.user_id}
            restaurant={this.props.restaurant.id}
          />
        );
      }
    } else {
      return (
        <Button
          rounded
          light
          style={styles.queueButtons}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
        >
          <Text style={styles.white}>Login to Join Q</Text>
        </Button>
      );
    }
  }

  render() {
    const { restaurant } = this.props;

    return (
      <View style={styles.qContainer}>
        <Image
          source={{
            uri:
              restaurant.picture ||
              "https://screenshotlayer.com/images/assets/placeholder.png"
          }}
          style={styles.img}
        />
        <View style={styles.qCircle}>
          <View style={styles.iqCircle}>{this.getQueueNumber()}</View>
          <View>{this.getQueueOptions()}</View>
        </View>
      </View>
    );
  }
}

export default withNavigation(observer(Queue));
