import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "../nestedScreens/DefaultScreenPosts";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";
import { MapScreen } from "../nestedScreens/MapScreen";
import Icon from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/authoperations";

const NestedScreen = createStackNavigator();

export const PostsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          title: "Публикации",
          headerTitleAlign: "center",
          headerPressColor: "#FF6C00",
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerStyle: styles.headerBox,
          headerPressColor: "#FF6C00",
          headerTitleStyle: styles.headerTitle,
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              <Icon name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ route }) => ({
          headerStyle: styles.headerBox,
          headerPressColor: "#FF6C00",
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: "center",
          title: "Коментарии",
          tabBarVisible: false,
        })}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerStyle: styles.headerBox,
          headerPressColor: "#FF6C00",
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: "center",
          title: "Карта",
        }}
      />
    </NestedScreen.Navigator>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 17,
    color: "#212121",
    letterSpacing: -0.408,
  },
  headerBox: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
});
