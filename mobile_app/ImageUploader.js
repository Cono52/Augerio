import React, { Component } from 'react';
// eslint-disable-next-line import/no-unresolved
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-picker';
import { View, Image } from 'react-native';
import { Button } from 'react-native-elements';

import createFormData from './createFormData';

class ImageUploader extends Component {
  constructor() {
    super();
    this.state = {
      photo: null,
      latestUploadResult: null
    };
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  handleUploadPhoto = () => {
    const { photo } = this.state;
    ImageResizer.createResizedImage(photo.uri, 1280, 1280, 'JPEG', 80)
      .then((resizedImage) => {
        fetch('http://192.168.42.125:3001/user/upload', {
          method: 'POST',
          body: createFormData(resizedImage, { userId: '123' })
        })
          .then(res => res.json())
          .then((res) => {
            this.setState({ photo: null, latestUploadResult: res });
            alert(`Upload Success! ${res}`);
          })
          .catch((error) => {
            alert(`Upload failed! ${error}`);
          });
      })
      .catch((err) => {
        alert(`something went wrong! ${err}`);
      });
  };

  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <>
            <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300 }} />
            <Button title="Upload" onPress={this.handleUploadPhoto} />
          </>
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}

export default ImageUploader;
