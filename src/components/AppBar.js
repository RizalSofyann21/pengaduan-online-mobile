import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const AppBar = () => {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-outline" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="person-outline" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end", // Mengatur ikon ke kanan
    alignItems: "center",
    height: 50,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    elevation: 4,
    width: "100%", // Menutupi lebar penuh layar
    position: "absolute", // Membuat posisi absolut
    top: 0, // Menempel di bagian atas layar
    zIndex: 1, // Memastikan berada di atas elemen lain
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default AppBar;
