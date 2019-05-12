import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button } from "react-native-elements";
import ImagePicker from "react-native-image-picker";

import createFormData from "./createFormData";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 20
  },
  button: {
    backgroundColor: "rgba(255, 99,216, 1)",
    height: 60,
    borderRadius: 1000,
    width: 60
  }
});

export default class App extends Component {
  state = {
    photo: null
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  handleUploadPhoto = () => {
    fetch("http://192.168.1.105:3001/api/upload", {
      method: "POST",
      body: createFormData(this.state.photo, { userId: "123" })
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response);
        alert("Upload success!");
        this.setState({ photo: null });
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  render() {
    const { photo } = this.state;
    return (
      <>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {photo && (
            <>
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 300, height: 300 }}
              />
              <Button title="Upload" onPress={this.handleUploadPhoto} />
            </>
          )}
          <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        </View>
        {/* <View style={styles.container}>
          <Text style={styles.instructions}>
            Try take a decent pie of the patient...
          </Text>
          <Button
            raised
            icon={{
              name: "camera-retro",
              type: "font-awesome",
              color: "white",
              size: 30
            }}
            buttonStyle={styles.button}
          />
        </View> */}
      </>
    );
  }
}
