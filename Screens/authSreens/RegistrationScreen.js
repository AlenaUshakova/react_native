import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { imageUploader } from "../../utils/imageUploader";
import { register } from "../../redux/auth/authoperations";

const initialState = {
  image: "",
  login: "",
  email: "",
  password: "",
};

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState("");
  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleBlur = () => {
    setIsFocused("");
    setIsShowKeyboard(false);
  };

  const handleFocus = (value) => {
    setIsShowKeyboard(true);
    setIsFocused(value);
  };

  const onSubmitForm = () => {
    if (!state.email || !state.login || !state.password) {
      return Alert.alert("заполните все поля");
    }
    
    dispatch(register(state));
    setIsShowKeyboard(false);
    setState(initialState);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/BG_main.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.container,
                marginBottom: isShowKeyboard ? -150 : 0,
              }}
            >
              <View style={styles.form}>
                <View style={styles.containerForAvatar}>
                  {state.image ? (
                    <Image
                      style={styles.avatar}
                      source={{ uri: state.image }}
                    />
                  ) : null}
                  <Pressable
                    style={styles.addImageBtn}
                    onPress={() => imageUploader(setState, setIsShowKeyboard)}
                  >
                    {state.image ? (
                      <Image
                        source={require("../../assets/images/add_X.png")}
                        style={{
                          ...styles.imageAdd,
                          width: 25,
                          height: 25,
                          transform: [{ rotate: "-45deg" }],
                        }}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/images/add.png")}
                        style={{ ...styles.imageAdd, width: 25, height: 25 }}
                      />
                    )}
                  </Pressable>
                </View>
                <Text style={styles.formTitle}>Регистрация</Text>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor:
                        isFocused === "login" ? "#FF6C00" : "#E8E8E8",
                    }}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("login")}
                    value={state.login}
                    placeholder="Логин"
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, login: value }))
                    }
                  />
                </View>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor:
                        isFocused === "email" ? "#FF6C00" : "#E8E8E8",
                    }}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("email")}
                    value={state.email}
                    placeholder="Адрес электронной почты"
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor:
                        isFocused === "password" ? "#FF6C00" : "#E8E8E8",
                    }}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus("password")}
                    value={state.password}
                    placeholder="Пароль"
                    secureTextEntry={showPassword}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <Pressable
                    style={styles.passwordIndicator}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text
                      style={{
                        ...styles.passwordIndicatorText,
                        opacity: !state.password ? 0.5 : 1,
                      }}
                    >
                      Показать
                    </Text>
                  </Pressable>
                </View>

                <Pressable style={styles.formBtn} onPress={onSubmitForm}>
                  <Text style={styles.formBtnText}>Зарегистрироваться</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.formText}>Уже есть аккаунт? Войти</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: "auto",
    paddingBottom: 45,
  },
  form: {},
  formTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginTop: 92,
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  formBtn: {
    backgroundColor: "#FF6C00",
    padding: 16,
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
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
    position: "absolute",
    top: -60,
    left: "33%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
  },
  imageAdd: {
    width: 25,
    height: 25,
  },
  addImageBtn: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  avatar: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  passwordIndicator: {
    position: "absolute",
    top: 15,
    right: 16,
  },
  passwordIndicatorText: {
    color: "#1B4371",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: "flex-end",
  },
});

export default RegistrationScreen;
