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
import { imageUploader } from "../utils/imageUploader";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";

const initialState = {
  image: "",
  title: "",
  position: "",
};

export const CreatePostsScreen = ({ navigation, route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [disabled, setDisabled] = useState(true);

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

  const onSubmitForm = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", state.image);
    data.append("title", state.title);
    data.append("position", state.position);
    console.log(JSON.stringify(data));
    setIsShowKeyboard(false);
    setState(initialState);
    setDisabled(true);
  };

  useEffect(() => {
    if (state.image && state.title && state.position) {
      setDisabled(false);
    }
  }, [state.image.length, state.title.length, state.position.length]);

  return (
    <>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.form}>
              <View style={styles.containerForAvatar}>
                {state.image ? (
                  <Image style={styles.avatar} source={{ uri: state.image }} />
                ) : null}
                <Pressable
                  style={{
                    ...styles.addImageBtn,
                    backgroundColor: state.image
                      ? "rgba(255, 255, 255, 0.3)"
                      : "#ffffff",
                  }}
                  onPress={() => imageUploader(setState, setIsShowKeyboard)}
                >
                  {state.image ? (
                    <Icon name="photo-camera" size={24} color="#FFFFFF" />
                  ) : (
                    <Icon name="photo-camera" size={24} color="#BDBDBD" />
                  )}
                </Pressable>
              </View>
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
    </>
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
    marginTop: 50,
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
  containerForAvatar: {
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
  },

  addImageBtn: {
    position: "absolute",
    transform: [{ translateX: 140 }, { translateY: 100 }],
    padding: 18,
    borderRadius: 50,
  },
  avatar: {
    borderRadius: 8,
    width: 343,
    height: 240,
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
