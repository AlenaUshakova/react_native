import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";

import Icon from "@expo/vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

const initialState = {
  image: "",
  title: "",
  position: "",
};

export const CreatePostsScreen = ({ navigation, route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [disabled, setDisabled] = useState(true);
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [mainLocation, setMainLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      await MediaLibrary.createAssetAsync(photo.uri);
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setMainLocation({ latitude, longitude });
      const url = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=alenaushakova`;
      try {
        const response = await fetch(url);
        const result = await response.json();

        const position = `${result.geonames[0].name}, ${result.geonames[0].countryName}`;
        setState((prevState) => ({ ...prevState, position }));
      } catch (error) {
        console.error(error);
      }
      setState((prevState) => ({ ...prevState, image: photo.uri }));
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleBlur = () => {
    setIsShowKeyboard(false);
  };

  const handleFocus = () => {
    setIsShowKeyboard(true);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // const data = new FormData();
    // data.append("image", state.image);
    // data.append("title", state.title);
    // data.append("position", state.position);
    // console.log(JSON.stringify(data));

    navigation.navigate("DefaultScreen", { ...state, ...mainLocation });
    setIsShowKeyboard(false);
    setState(initialState);
    setDisabled(true);
  };

  useEffect(() => {
    if (state.image && state.title && state.position) {
      setDisabled(false);
    }
  }, [state.image.length, state.title.length, state.position.length]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <Camera
              style={styles.containerCamera}
              ref={(ref) => {
                setCamera(ref);
              }}
            >
              {state.image ? (
                <Image style={styles.photo} source={{ uri: state.image }} />
              ) : null}
              <Pressable
                style={{
                  ...styles.addImageBtn,
                  backgroundColor: state.image
                    ? "rgba(255, 255, 255, 0.3)"
                    : "#ffffff",
                }}
                onPress={takePhoto}
              >
                {state.image ? (
                  <Icon name="photo-camera" size={24} color="#FFFFFF" />
                ) : (
                  <Icon name="photo-camera" size={24} color="#BDBDBD" />
                )}
              </Pressable>
            </Camera>
            <Text style={styles.formTitle}>Загрузите фото</Text>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={styles.input}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={state.title}
                placeholder="Название..."
                placeholderTextColor="#BDBDBD"
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, title: value }))
                }
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={styles.input}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={state.position}
                placeholder="Местность..."
                placeholderTextColor="#BDBDBD"
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, position: value }))
                }
              />
            </View>

            <Pressable
              style={{
                ...styles.formBtn,
                backgroundColor: disabled ? "#F6F6F6" : "#FF6C00",
              }}
              onPress={onSubmitForm}
              disabled={disabled}
            >
              <Text
                style={
                  disabled
                    ? { ...styles.formBtnText, color: "#BDBDBD" }
                    : styles.formBtnText
                }
              >
                Опубликовать
              </Text>
            </Pressable>
            <Pressable
              style={styles.deleteBtn}
              onPress={() => setState(initialState)}
            >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  form: {
    paddingTop: 32,
    alignItems: "center",
    justifyContent: "space-between",
  },
  formTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
    marginBottom: 32,
    alignSelf: "flex-start",
    textAlign: "left",
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    height: 50,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",
    width: 343,
  },
  formBtn: {
    padding: 16,
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
    width: 343,
  },
  deleteBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 28,
    paddingLeft: 28,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
  formBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  formText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
  containerCamera: {
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
  },
  photo: {
    borderRadius: 8,
    width: 343,
    height: 240,
  },
  addImageBtn: {
    position: "absolute",
    transform: [{ translateX: 140 }, { translateY: 100 }],
    padding: 18,
    borderRadius: 50,
  },
  passwordIndicator: {
    position: "absolute",
    top: 15,
    right: 16,
  },
  passwordIndicatorText: {
    color: "#1B4371",
  },
});
