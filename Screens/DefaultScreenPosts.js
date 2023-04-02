import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  Pressable,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
    
 
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 60, height: 60, borderRadius: 16, marginRight: 8 }}
        />
        <View>
          <Text>Name</Text>
          <Text>Email</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 32,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 343, height: 240 }}
            />
            <Text style={{ marginTop: 8 }}>{item.title}</Text>

            <View style={styles.userCard}>
              <Pressable
                onPress={() => navigation.navigate("Comments")}
                style={styles.commentInfo}
              >
                <EvilIcons name="comment" size={24} color="#BDBDBD" />
                <Text style={{ color: "#BDBDBD" }}>0</Text>
              </Pressable>
              <EvilIcons name="location" size={24} color="#BDBDBD" />
              <Text
                style={styles.textLocation}
                onPress={() =>
                  navigation.navigate("Map", {
                    latitude: item.latitude,
                    longitude: item.longitude,
                  })
                }
              >
                {item.position}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  userInfo: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  userCard: {
    flexDirection: "row",
    marginTop: 8,
  },
  commentInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 49,
  },
  textLocation: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    textDecorationLine: "underline",
    color: "#212121",
  },
});
