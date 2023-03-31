import {
  StyleSheet,
  Pressable,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "../Screens/PostsScreen";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { HeaderBackButton } from "@react-navigation/elements";
import Icon from "@expo/vector-icons/Feather";

const Tab = createBottomTabNavigator();

export const Home = ({ navigation }) => {

  const handleLogout = () => {
    // navigation.navigate("Login");
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarItemStyle: {
          maxWidth: 70,
          width: 70,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveBackgroundColor: "transparent",
        tabBarIconStyle: { strokeWidth: 1 },
        tabBarStyle: {
          display: "flex",
          height: 83,
          paddingTop: 9,
          paddingBottom: 34,
          paddingHorizontal: 81,
          alignContent: "center",
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = "grid";
          } else if (route.name === "CreatePosts") {
            iconName = "plus";
            return <Feather name={iconName} size={13} color={color} />;
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          return <Feather name={iconName} size={24} color={color} />;
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публикации",
          headerTitleAlign: "center",
          headerStyle: styles.headerBox,
          headerPressColor: "#FF6C00",
          headerTitleStyle: styles.headerTitle,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              <Icon name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
          headerTitleAlign: "center",
          headerStyle: styles.headerBox,
          headerPressColor: "#FF6C00",
          headerTitleStyle: styles.headerTitle,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerLeft: () => (
            <HeaderBackButton
              backImage={() => (
                <Icon name="arrow-left" size={24} color="#BDBDBD" />
              )}
              onPress={() => navigation.navigate("Posts")}
            />
          ),
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
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
