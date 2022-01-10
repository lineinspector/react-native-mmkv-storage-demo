/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import { EncryptedStorage, LocalStorage } from "./services/storage";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Colors,
  Header,
} from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

const IS_LOGGEDIN_KEY = "isLoggedIn";

export default class App extends Component {

  /**
   * 
   * @param {*} props Initialize app
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isLoggedIn: false,
    };
  }

  /**
   * Bootstrap application
   */
  async componentDidMount() {
    // init services
    await LocalStorage.initialize();
    await EncryptedStorage.initialize();

    const isLoggedIn = await EncryptedStorage.getItem(IS_LOGGEDIN_KEY);
    this.setState({
      isLoading: false,
      isLoggedIn: isLoggedIn,
    });
  }

  /**
   * Render app contents
   * @param {*} isLoggedIn 
   * @returns 
   */
  renderContents(isLoggedIn) {
    if(isLoggedIn){
      return (<Text>You are logged in!</Text>);
    }

    return (<Button onPress={this.onLogin} title="Login">Login</Button>);
  }

  /**
   * Handle login
   */
  onLogin = async () => {
    const value = 'YES';
    await EncryptedStorage.setItem(IS_LOGGEDIN_KEY, value);
    this.setState({
      isLoggedIn: value
    })
  } 

  /**
   * Render application
   */
  render() {
    const { isLoading, isLoggedIn } = this.state;
    const backgroundStyle = {
      backgroundColor: Colors.lighter,
    };

    const viewStyle = {
      backgroundColor: Colors.white,
    };

    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={"dark-content"} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          <Header />
          <View style={viewStyle}>
            {isLoading && <Text style={{textAlign: 'center'}}>Loading ...</Text>}
            {!isLoading && this.renderContents(isLoggedIn)}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
