import React, { useState } from 'react';
import { Button, Image, TextInput, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { supabase } from '../lib/supabase'; // import your supabase client

export default function CreatePost() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);


  const pickImage = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        setImageUri(uri);
      }
    });
  };

  const submitPost = async () => {
  // upload image to Supabase Storage and get the URL
  let imageUrl = '';
  if (image) {
    const response = await fetch(image);
    const blob = await response.blob();
    const fileName = Date.now().toString(); // generate a unique name based on the current timestamp
    const { data, error } = await supabase.storage.from('posts').upload(fileName, blob);
    if (error) {
      console.error('Error uploading image:', error);
    } else {
      imageUrl = data.publicURL;
    }
  }
  
};

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="What's on your mind?"
      />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick an image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Submit" onPress={submitPost} />
    </View>
  );
}
