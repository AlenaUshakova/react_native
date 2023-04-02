import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "./DefaultScreenPosts";
import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";
import Icon from "@expo/vector-icons/Feather";
import { StyleSheet, Pressable } from "react-native";

const NestedScreen = createStackNavigator();

const handleLogout = () => {
  // navigation.navigate("Login");
};

const DefaultScreenOptions = {
  title: "Публикации",
  headerTitleAlign: "center",

  headerPressColor: "#FF6C00",

  headerRightContainerStyle: { paddingRight: 16 },
  headerLeftContainerStyle: { paddingLeft: 16 },
  headerRight: () => (
    <Pressable onPress={handleLogout}>
      <Icon name="log-out" size={24} color="#BDBDBD" />
    </Pressable>
  ),
};
export const PostsScreen = ({ route, navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={DefaultScreenOptions}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: "Коментарии" }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Карта" }}
      />
    </NestedScreen.Navigator>
  );
};
