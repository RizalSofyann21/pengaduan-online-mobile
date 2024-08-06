import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfilInstansi = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Instansi</Text>
      <Text style={styles.description}>
        Ini adalah halaman profil instansi. Anda bisa menambahkan informasi
        mengenai instansi Anda di sini.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ProfilInstansi;
