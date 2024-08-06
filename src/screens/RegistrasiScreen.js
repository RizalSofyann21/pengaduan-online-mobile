import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";

const RegistrasiScreen = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert(
        "Registrasi Gagal",
        "Password dan konfirmasi password tidak sesuai"
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.240.210:3000/registrasi",
        {
          nama,
          nik,
          email,
          password,
        }
      );
      console.log("Response Data: ", response.data); // Tambahkan log ini
      console.log("Response Status: ", response.status); // Tambahkan log ini
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Registrasi Berhasil", "Anda telah berhasil registrasi");
        navigation.navigate("Login");
      } else {
        Alert.alert(
          "Registrasi Gagal",
          "Terjadi kesalahan saat melakukan registrasi"
        );
      }
    } catch (error) {
      Alert.alert("Registrasi Gagal", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")} // Ganti dengan path logo Anda
          style={styles.logo}
        />
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={nama}
          onChangeText={setNama}
        />
        <TextInput
          style={styles.input}
          placeholder="NIK"
          value={nik}
          onChangeText={setNik}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} />
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Sudah memiliki akun? Login disini
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#ccc",
  },
  loginLink: {
    marginTop: 20,

    color: "blue",
    textDecorationLine: "underline",
  },
});

export default RegistrasiScreen;
