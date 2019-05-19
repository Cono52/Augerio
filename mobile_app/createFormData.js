import { Platform } from 'react-native';

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.name,
    type: 'image/jpeg',
    uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '')
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export default createFormData;
