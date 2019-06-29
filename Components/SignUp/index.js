import React, { Component } from "react";
import { withNavigation } from "react-navigation";

import { ImageBackground, View } from "react-native";
import { Button, Container, Icon, Input, Item, Text } from "native-base";
// import { Card } from "react-native-elements";

// import Gradient from "react-native-css-gradient";
// Stores
import authStore from "../../Stores/authStore";

import styles from "../Login/styles.js";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: ""
    };
  }

  render() {
    return (
      <ImageBackground
        imageStyle={{ opacity: 0.2 }}
        style={{ width: "100%", height: "100%" }}
        source={{
          uri:
            "http://inspiredboy.com/uploads/201509/full/lovely-food-background-vector-map-1-749a15f78cd04f60a511bf447d32b20e.jpg"
        }}
        style={styles.cardImg}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.formtitle}>Sign Up</Text>
        </View>
        <View
          style={{
            flex: 1,
            margin: 30,
            justifyContent: "center",
            alignItems: "stretch"
          }}
        >
          <Item style={styles.formfield}>
            <Icon active style={styles.red} type="Entypo" name="user" />
            <Input
              placeholderTextColor="gray"
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={username => this.setState({ username })}
            />
          </Item>
          <Item style={styles.formfield}>
            <Icon active style={styles.red} type="Entypo" name="key" />
            <Input
              placeholderTextColor="gray"
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Item style={styles.formfield}>
            <Icon active style={styles.red} type="Entypo" name="edit" />
            <Input
              placeholderTextColor="gray"
              placeholder="First Name"
              autoCapitalize="none"
              onChangeText={first_name => this.setState({ first_name })}
            />
          </Item>
          <Item style={styles.formfield}>
            <Icon active style={styles.red} type="Entypo" name="edit" />
            <Input
              placeholderTextColor="gray"
              placeholder="Last Name"
              autoCapitalize="none"
              onChangeText={last_name => this.setState({ last_name })}
            />
          </Item>
          <Item style={styles.formfield}>
            <Icon active style={styles.red} type="Entypo" name="email" />
            <Input
              placeholderTextColor="gray"
              placeholder="Email Adress"
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Button
            style={styles.formButton}
            full
            onPress={() =>
              authStore.registerUser(this.state, this.props.navigation)
            }
          >
            <Text>Sign Up</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}
export default withNavigation(SignUp);
