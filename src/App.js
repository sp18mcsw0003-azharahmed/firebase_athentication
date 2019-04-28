import React, { Component } from "react";
import { View } from "react-native";
// import the firebase third party lib
import firebase from "firebase";
// Custom Components to be used in the app
import { Header, CustomButton, CardSection, Card, Spinner } from "./components/common";
// Import our LoginForm component to be displayed on the screen
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = { loggedIn: null };
  // Life cycle method to init the firebase
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAQubHJYBaMtW9rrCZ_6bzZrinpwewxFdI",
      authDomain: "my-first-mobileapp.firebaseapp.com",
      databaseURL: "https://my-first-mobileapp.firebaseio.com",
      projectId: "my-first-mobileapp",
      storageBucket: "my-first-mobileapp.appspot.com",
      messagingSenderId: "194682157193"
    });

    //Handle the Application when it's logged in or logged out
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <CustomButton onPress={() => firebase.auth().signOut()}>
                Logout
              </CustomButton>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
        {/* 
        Before the renderContent Handling
        <LoginForm /> */}
      </View>
    );
  }
}

export default App;