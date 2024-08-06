import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

const MenuItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 150,
    height: 150,
    borderRadius: 60, // Set to half of width or height to make it round
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default MenuItem;
