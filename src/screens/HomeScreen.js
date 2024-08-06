import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MenuItem from "../components/MenuItem";
import { useNavigation } from "@react-navigation/native";
import AppBar from "../components/AppBar";
import { useRoute } from "@react-navigation/native";

const menuItems = [
  {
    id: "1",
    title: "Buat Pengaduan",
    image: require("../../assets/images/pengaduan.png"),
    screen: "Buat Pengaduan",
  },
  {
    id: "2",
    title: "Profil Instansi",
    image: require("../../assets/images/instansi.png"),
    screen: "Profil Instansi",
  },
  {
    id: "3",
    title: "Informasi",
    image: require("../../assets/images/info.png"),
    screen: "Informasi",
  },
  {
    id: "4",
    title: "History",
    image: require("../../assets/images/history.png"),
    screen: "Screen4",
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  console.log("Home page: ", user);

  const renderItem = ({ item }) => {
    return (
      <MenuItem
        item={item}
        onPress={() => navigation.navigate(item.screen, { user: user })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppBar />
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    paddingTop: 90,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
